import React, { Component } from 'react';

export default class GenericParent extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}