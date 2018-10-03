import React, { Component } from 'react';
import CityContainer from '../containers/CityContainer';

export default class GenericParent extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
           <section className={"wrapper style5"}>
                <div className={"inner"}>
                    <form>
                        <CityContainer selectedItem={"2"}/>
                        {this.props.children}
                    </form>
                </div>
           </section>
        );
    }
}