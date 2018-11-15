import { ReactNodeLike } from 'prop-types';
import * as React from 'react';
import { Component } from 'react';
import { Col , Row} from 'reactstrap';
import { TreeNode, treeNodeTypes } from './Types';

interface IProps {
    offset:number
    node:TreeNode
    renderNode: (node : any) => ReactNodeLike
}


export class Node extends Component<IProps,{}> {

    public render(){
        const elements = [<Row
            style={{margin:0}}
            key={this.props.offset+"r"}>
            <Col xs={{ size: "auto", offset: this.props.offset }}>
                {this.props.renderNode(this.props.node)}
            </Col>
        </Row>]
        if(this.props.node.type === treeNodeTypes.APPLICATION || this.props.node.type === treeNodeTypes.FOLDER){
            elements.push(...(this.props.node.children === undefined || this.props.node.collapsed)? []: this.props.node.children.map((node,i) => <Node key={this.props.offset+""+i} node={node} offset={this.props.offset+1} renderNode={this.props.renderNode}/>))
        }
        return elements
    }
}