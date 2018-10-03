import React, { Component } from 'react';

export default class GenericParent extends Component {
    constructor(props) {
        super(props);
    }
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