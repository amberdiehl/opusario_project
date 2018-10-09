import React, { Component } from 'react';

export default class WrapperComponent extends Component {
    render(){
        return(
           <section className={"wrapper style5"}>
                <div className={"inner"}>
                    {this.props.children}
                </div>
           </section>
        );
    }
}