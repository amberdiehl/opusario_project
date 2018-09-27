import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class DynamicSelectList extends Component {
    constructor(props) {
        super(props);
        this.inputNewItem = React.createRef();
        this.renderSelectField = this.renderSelectField.bind(this);
        this.renderAddInput = this.renderAddInput.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
    }
    componentDidMount() {
        this.props.fetchItems();
    }
    renderSelectField() {
        return (
            <div className={"col-6 col-12-xsmall"}>
                <select id={`select${this.props.componentId}`}
                    disabled={this.props.isLoading}
                    value={this.props.selectItem}
                    onChange={(event) => {this.props.setSelectValue(event.target.value);}}>
                        {this.props.items.map(item => (
                            <option key={`industry-${item.id}`} value={item.id}>{item.name}</option>
                        ))}
                </select>
            </div>
        )
    }
    renderAddInput() {
        if (this.props.allowAdd) {
            return (
                <div className="col-3 col-3-xsmall">
                    <input type={"text"} ref={this.inputNewItem} placeholder={this.props.componentId}/>
                </div>
            )
        }
    }
    renderAddButton() {
        if (this.props.allowAdd) {
            return (
                <div className="col-3 col-3-xsmall">
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            this.props.addItem(this.inputNewItem.current.value);
                            this.inputNewItem.current.value = '';
                        }
                    }>
                        Add {this.props.componentId}</button>
                </div>
            )
        }
    }
    render() {
        return (
            <section className={"wrapper style5"}>
                <div className={"inner"}>
                    <form>
                        <div className="row gtr-uniform">
                            {this.renderSelectField()}
                            {this.renderAddInput()}
                            {this.renderAddButton()}
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

DynamicSelectList.propTypes = {
    allowAdd: PropTypes.bool.isRequired,
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectItem: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addItem: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired,
    setSelectValue: PropTypes.func.isRequired,
};
