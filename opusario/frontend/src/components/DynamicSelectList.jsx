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
            const validationErrorMessage = `${this.props.componentId} can only contain ${this.props.regExDescription}`;
            return (
                <div className="col-3 col-3-xsmall">
                    <button className={"button primary small"} onClick={
                        (e) => {
                            e.preventDefault();
                            let isValid = this.props.validationRegEx.test(this.inputNewItem.current.value);
                            if (isValid) {
                                this.props.addItem(this.inputNewItem.current.value);
                                this.inputNewItem.current.value = '';
                            } else {
                                this.props.showError(true, validationErrorMessage)
                            }
                        }
                    }>
                        Add {this.props.componentId}</button>
                </div>
            )
        }
    }
    render() {
        const showErrorStyle = {display: "block"};
        const hideErrorStyle = {display: "none"};
        return (
            <section className={"wrapper style5"}>
                <div className={"inner"}>
                    <form>
                        <div className={"row gtr-uniform"}>
                            {this.renderSelectField()}
                            {this.renderAddInput()}
                            {this.renderAddButton()}
                        </div>
                        <div className={"row"} style={(this.props.isError) ? showErrorStyle : hideErrorStyle}>
                            <div className={"col-10 component-error-message"}>
                                {this.props.errorMessage}
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

DynamicSelectList.propTypes = {
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectItem: PropTypes.string.isRequired,
    allowAdd: PropTypes.bool.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    setSelectValue: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
};
