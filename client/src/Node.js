import React, { Component } from 'react';
import { Row , Col} from 'reactstrap';


export class Node extends Component {

    render(){
        
        return [<Row
            key={this.props.offset+"r"}>
            <Col xs={{ size: "auto", offset: this.props.offset }}>
                {this.props.renderNode(this.props.node)}
            </Col>
        </Row>,
        ...((this.props.node.children === undefined || this.props.node.collapsed)? []: this.props.node.children.map((node,i) => {
            return <Node key={this.props.offset+""+i} node={node} offset={this.props.offset+1} renderNode={this.props.renderNode}/>}))
        ]
    }
}