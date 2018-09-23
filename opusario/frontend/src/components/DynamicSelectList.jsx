import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class DynamicSelectList extends Component {
    constructor(props) {
        super(props);
        this.inputNewItem = React.createRef();
    }
    componentDidMount() {
        this.props.fetchItems();
    }
    render() {
        return (
            <section className={"wrapper style5"}>
                <div className={"inner"}>
                    <form>
                        <div className="row gtr-uniform">
                            <div className={"col-6 col-12-xsmall"}>
                                <select id={`select${this.props.componentId}`}>
                                    {this.props.items.map(item => (
                                        <option key={`industry-${item.id}`} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-3 col-3-xsmall">
                                <input type={"text"} ref={this.inputNewItem} placeholder={this.props.componentId}/>
                            </div>
                            <div className="col-3 col-3-xsmall">
                                <button>Add {this.props.componentId}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

DynamicSelectList.propTypes = {
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};
