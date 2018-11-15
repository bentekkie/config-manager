import { ReactNodeLike } from 'prop-types';
import * as React from 'react';
import { Component } from 'react'
import {Node} from './Node'
import './Tree.css'
import { TreeNode } from './Types';


interface IProps {
    node:TreeNode
    renderNode: (node : any) => ReactNodeLike
}

export class Tree extends Component<IProps,{}> {

    public render(){
        return <Node
                key={0}
                node={this.props.node}
                offset={0}
                renderNode={this.props.renderNode}/>
    }
}