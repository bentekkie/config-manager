import * as React from 'react';
import { Component } from 'react';
import { Controlled } from 'react-codemirror2'
import { Button, Col, Container, Input, InputGroup, InputGroupAddon,  Modal, ModalBody, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { Tree } from './Tree';
import { treeNodeIcons, treeNodeTypes, FolderNode, TreeNode, FileNode  } from './Types'
import './App.css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css';
import SplitPane from 'react-split-pane'
import { faCaretRight, faCaretDown, faSave } from '@fortawesome/free-solid-svg-icons'
import * as io from 'socket.io-client';


interface IState {
  adding: boolean,
  code: string,
  original: string,
  tree: FolderNode,
  saving: boolean,
  loadedLangs: {},
  currLanguage: string,
  selectLanguageValue?: {
    value:string,
    label:string
  },
  active?:FileNode,
  currFileType: string,
  languages: string[],
  editorKey: number
}

// tslint:disable-next-line:no-var-requires
(window as Window & {CodeMirror:any}).CodeMirror = require('codemirror/lib/codemirror')

class App extends Component<{},IState> {
  
  private socket : SocketIOClient.Socket

  constructor(props : any) {
    super(props)
    this.socket = io()
    this.state = {
      adding: false,
      code: "",
      original: "",
      tree: {
        module: 'Applications',
        type: treeNodeTypes.FOLDER,
        children: []
      },
      saving: false,
      loadedLangs: {},
      currLanguage: "",
      currFileType: "",
      languages: [],
      editorKey: Date.now()
    }
    this.socket.on('get file complete', (_: string , code : string, type : string) => {
      if(type){
        let tmplang = type.split('/')[1]
        if (tmplang === "plain") {
          tmplang = "properties"
        }
        if (tmplang !== null && this.state.languages.indexOf(tmplang) > 0) {
          if (!this.state.loadedLangs[tmplang]) {
            this.socket.emit('get language', tmplang)
          }
          this.setState({ currLanguage: tmplang, selectLanguageValue: { value: tmplang, label: tmplang } })
        }
      }
      
      this.setState({ code, original: code, currFileType: type })
    })
    this.socket.on('config', (config : {[key : string] : any}) => {
      this.setState(({ tree, active, code, original , currFileType, currLanguage, selectLanguageValue }) => {
        tree.children = []
        let newActive : FileNode | undefined;
        for (const app in config) {
          if (typeof config[app] === 'object') {
            const node : TreeNode = {
              module: app,
              type: treeNodeTypes.APPLICATION,
              children: []
            }
            for (const file in config[app]) {
              if(config[app].hasOwnProperty(file)){
                node.children.push({
                  module: file,
                  path: config[app][file],
                  type: treeNodeTypes.FILE
                })
                if(active !== undefined && config[app][file] === active.path){
                  newActive = node.children[node.children.length-1] as FileNode
                }
              }
            }
            if(newActive === undefined){
              code = original = currFileType = currLanguage = ""
              selectLanguageValue = undefined
            }
            tree.children.push(node)
          }
        }
        return { tree, active:newActive, code, original , currFileType, currLanguage, selectLanguageValue}
      })
    })
    this.socket.on('server_error', (err : string) => {
      // tslint:disable-next-line:no-console
      console.error(err)
    })
    this.socket.on('languages', (languages : string[]) => {
      this.setState({ languages })
    })
    this.socket.on('set file complete', () => {

      this.setState(({ code }) => ({ saving: false, original: code }))
    })
    this.socket.on('get language complete', (language : string , content : string) => {
      // tslint:disable-next-line:no-eval
      eval(content)
      this.setState(({ loadedLangs }) => {
        loadedLangs[language] = true
        return { loadedLangs, editorKey: Date.now() }
      })
    })
  }

  public renderNode = (node : TreeNode) => {
    const className = (node === this.state.active) ? "treeNode selected" : "treeNode"
    return (
      <span
        onClick={this.onClickNode.bind(null, node)}
        className={className}
        style={{ color: "white" }}
      >
        {(node.type === treeNodeTypes.APPLICATION || node.type === treeNodeTypes.FOLDER) ? <FontAwesomeIcon icon={(node.collapsed) ? faCaretRight : faCaretDown} /> : []}
        <FontAwesomeIcon icon={treeNodeIcons(node.type)} />
        {" " + node.module}

      </span>
    );
  };


  public getFile = (path : string) => {
    this.socket.emit('get file', path)
  }

  public onClickNode = (node : TreeNode) => {
    switch (node.type) {
      case treeNodeTypes.FILE:
        this.getFile(node.path)
        this.setState({
          active: node
        });
        break;
      case treeNodeTypes.FOLDER:
      case treeNodeTypes.APPLICATION:
        node.collapsed = !node.collapsed
        this.setState({ tree: this.state.tree })
        break;
      default:
        break;
    }

  };

  public render() {
    return (
      <Container fluid={true} style={{ height: "100%" }}>

        <Row style={{ height: "100%" }}>
          <SplitPane split="vertical" minSize={200} defaultSize={"25%"}>
            <div style={{ backgroundColor: "#455a64", height: "100%", overflow:"auto" }}>
              <Tree
                node={this.state.tree}        // tree object
                renderNode={this.renderNode}
              />
            </div>
            <div style={{ height: "100%", backgroundColor: "#263238", overflow: "auto" }}>
            <Row style={{margin:0}}>
                <Col xs={{ size: 9 }} style={{ padding: 0 }}>
                  <InputGroup>
                    <Input disabled={true} value={(this.state.active) ? this.state.active.path : ""} />
                    <InputGroupAddon addonType="append"><Button onClick={() => {
                      if(this.state.active){
                        this.socket.emit('set file', this.state.active.path, this.state.code)

                        this.setState({ saving: true })
                      }
                    }}><FontAwesomeIcon icon={faSave} /></Button></InputGroupAddon>
                  </InputGroup>

                </Col>
                <Col xs={{ size: 3 }} style={{ padding: 0 }}>
                  <Select
                    options={this.state.languages.map(l => ({ value: l, label: l }))}
                    onChange={e => {
                      if(e !== null && e !== undefined && !(e instanceof Array)){
                        const currLanguage = e.value
                        if (currLanguage !== null && !this.state.loadedLangs[currLanguage]) {
                          this.socket.emit('get language', currLanguage)
                        }
                        this.setState({ currLanguage, selectLanguageValue: e })
                      }
                      
                    }}
                    value={this.state.selectLanguageValue}
                  />
                </Col>
              </Row>
              <Row style={{margin:0}}> 
                <Col xs={{ size: 12 }} >
                  <Controlled
                    key={this.state.editorKey}
                    value={this.state.code}
                    options={{
                      lineNumbers: true,
                      theme: 'material',
                      mode: this.state.currLanguage
                    }}
                    
                    onBeforeChange={(_editor, _data, code) => {
                      this.setState({ code });
                    }}/>
                </Col>
              </Row>
              
            </div>

          </SplitPane>
        </Row>
        <Modal isOpen={this.state.saving}>
          <ModalBody>
            Saving
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default App;
