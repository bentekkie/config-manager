import React, { Component } from 'react';
import {Controlled} from 'react-codemirror2'
import { Container, Row,  Modal, ModalBody, Button, Input, InputGroupAddon, InputGroup, Col} from 'reactstrap';
import Select from 'react-select'
import {Tree} from './Tree';
import { treeNodeTypes, treeNodeIcons } from './Types'
import './App.css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css';
import SplitPane from 'react-split-pane'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown, faSave } from '@fortawesome/free-solid-svg-icons'
import io from 'socket.io-client';

window.CodeMirror = require('codemirror/lib/codemirror')
class App extends Component {

  constructor(props){
    super(props)
    this.socket = io()
    this.state = {
      code:"",
      original:"",
      adding:false,
      newName:"",
      newFilePath:"",
      newParent:{},
      tree : {
        module: 'Applications',
        type: treeNodeTypes.FOLDER,
        children: []
      },
      saving:false,
      loadedLangs:{},
      currLanguage:"",
      selectLanguageValue:{},
      currFileType:"",
      languages:[],
      editorKey:Date.now()
    }
    this.socket.on('get file complete', (_path, code, type) => {
      let tmplang = type.split('/')[1]
      if(tmplang === "plain"){
        tmplang = "properties"
      }
      if(tmplang !== null && this.state.languages.indexOf(tmplang) > 0){
        if(!this.state.loadedLangs[tmplang]){
          this.socket.emit('get language',tmplang)
        }
        this.setState({currLanguage:tmplang,selectLanguageValue:{value:tmplang,label:tmplang}})
      }
      this.setState({code,original:code,currFileType:type})
    })
    this.socket.on('config',config => {
      this.setState(({tree}) => {
        tree.children=[]
        for(let app in config){
          if(typeof config[app] === 'object'){
            let node = {
              module:app,
              type: treeNodeTypes.APPLICATION,
              children:[]
            }
            for(let file in config[app]){
              node.children.push({
                module:file,
                path:config[app][file],
                type:treeNodeTypes.FILE
              })
            }
            tree.children.push(node)
          }
        }
        return {tree}
      })
    })
    this.socket.on('server_error', (err) => {
      console.error(err)
    })
    this.socket.on('languages', languages => {
      this.setState({languages})
    })
    this.socket.on('set file complete',() => {
      
      this.setState(({code}) => ({saving:false,original:code}))
    })
    this.socket.on('get language complete',(language,content) => {
      // eslint-disable-next-line
      eval(content) 
      this.setState(({loadedLangs}) => {
        loadedLangs[language] = true
        return {loadedLangs,editorKey:Date.now()}
      })
    })
  }

  renderNode = node => {
    let className = (node === this.state.active)?"treeNode selected":"treeNode"
    return (
      <span
        onClick={this.onClickNode.bind(null, node)}
        className={className}
        style={{color:"white"}}
      >
        {(node.type === treeNodeTypes.APPLICATION || node.type === treeNodeTypes.FOLDER)?<FontAwesomeIcon icon={(node.collapsed)?faCaretRight:faCaretDown}/>:[]}
        <FontAwesomeIcon icon={treeNodeIcons[node.type]}/>
        {" "+node.module}

      </span>
    );
  };

  isChanged = node => {
    if(node === this.state.active && this.state.code !== this.state.original){
      return <div 
        style={{display:"contents", color:"white"}}
        onClick={() => this.socket.emit('set file',node.path,this.state.code)}><FontAwesomeIcon icon={faSave}/></div> 
    }
    return []
  }

  getFile = (path) => {
    this.socket.emit('get file',path)
  }

  onClickNode = node => {
    switch(node.type){
      case treeNodeTypes.FILE:
        this.getFile(node.path)
        this.setState({
          active: node
        });
        break;
      case treeNodeTypes.FOLDER:
      case treeNodeTypes.APPLICATION:
        node.collapsed = !node.collapsed
        this.setState({tree:this.state.tree})
        break;
      default:
        break;  
    }
    
  };

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };
  render() {
    return (
      <Container fluid style={{height:"100%"}}>
        
          <Row style={{height:"100%"}}>
            <SplitPane split="vertical" minSize={200} defaultSize={"25%"}>
              <div style={{backgroundColor:"#455a64", height:"100%"}}>
                <Tree
                    node={this.state.tree}        // tree object
                    renderNode={this.renderNode}
                  />
              </div>
              <div style={{height:"100%",backgroundColor: "#263238"}}>
              <Row>
                <Col xs={{size:9}} style={{paddingRight:0}}>
                <InputGroup>
                <Input disabled value={(this.state.active)?this.state.active.path:""}/>
                <InputGroupAddon addonType="append"><Button onClick={() => {
                  this.socket.emit('set file',this.state.active.path,this.state.code)
                  
                  this.setState({saving:true})
                  }}><FontAwesomeIcon icon={faSave}/></Button></InputGroupAddon>
              </InputGroup>
              
                </Col>
                <Col xs={{size:3}} style={{paddingLeft:0}}>
                <Select
                    options={this.state.languages.map(l => ({value:l,label:l}))}
                    onChange={e => {
                      let currLanguage = e.value
                      if(currLanguage !== null && !this.state.loadedLangs[currLanguage]){
                        this.socket.emit('get language',currLanguage)
                      }
                      this.setState({currLanguage,selectLanguageValue:e})
                    }}
                    value={this.state.selectLanguageValue}
                  />
                </Col>
              </Row>
              
                <Controlled 
                    key={this.state.editorKey}
                    value={this.state.code}
                    options={{
                      lineNumbers:true,
                      theme: 'material',
                      mode:this.state.currLanguage
                    }}
                    onBeforeChange={(editor, data, code) => {
                      this.setState({code});
                    }}
                    editorDidMount={editor => { 
                      this.instance = editor
                    }}
                    onChange={(editor, data, value) => {
                    }}/>
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
