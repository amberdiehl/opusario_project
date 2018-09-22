import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class DynamicSelectList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={"col-12"}>
                <select name={this.props.componentName} id={this.props.componentId}>
                    {this.props.items.map(item => (
                        <option value={item.key}>{item.value}</option>
                    ))}
               </select>
            </div>
        )
    }
}

DynamicSelectList.propTypes = {
    componentId: PropTypes.string.isRequired,
    componentName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};
