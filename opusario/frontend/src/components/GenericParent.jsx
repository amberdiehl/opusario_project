import React, { Component } from 'react';

export default class GenericParent extends Component {
    render(){
        return(
           <section className={"wrapper style5"}>
                <div className={"inner"}>
                    <form>
                        {this.props.children}
                    </form>
                </div>
           </section>
        );
    }
}