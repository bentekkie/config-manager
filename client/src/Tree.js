import React, { Component } from 'react'
import {Node} from './Node'
import './Tree.css'

export class Tree extends Component {

    render(){
        return <Node
                key={0}
                node={this.props.node}
                offset={0}
                renderNode={this.props.renderNode}/>
    }
}