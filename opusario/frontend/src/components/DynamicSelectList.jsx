import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText, getTextAsTitleCase } from '../helpers';


export default class DynamicSelectList extends Component {
    constructor(props) {
        super(props);
        this.inputNewItem = React.createRef();
        this.renderSelectField = this.renderSelectField.bind(this);
        this.renderAddInput = this.renderAddInput.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
    }
    componentDidMount() {
        this.props.actions.fetchItems(this.props.namespace, this.props.apiRoute);
    }
    renderSelectField() {
        return (
            <div className={"col-6 col-12-xsmall"}>
                <select id={`select${this.props.componentId}`}
                    disabled={this.props.isLoading}
                    value={this.props.selectItem}
                    onChange={(event) => {
                        this.props.actions.setSelectValue(this.props.namespace, event.target.value);}
                    }>
                        {this.props.items.map(item => (
                            <option key={`industry-${item.id}`} value={item.id}>{item.name}</option>
                        ))}
                </select>
            </div>
        )
    }
    renderAddInput() {
        if (this.props.allowAdd) {
            const formattedPlaceholder = getFormattedLabelText(this.props.componentId);
            console.log(formattedPlaceholder);
            return (
                <div className="col-3 col-3-xsmall">
                    <input type={"text"}
                           ref={this.inputNewItem}
                           placeholder={getFormattedLabelText(this.props.componentId)}/>
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
                                this.props.actions.addItem(
                                    this.props.namespace,
                                    this.props.apiRoute,
                                    getTextAsTitleCase(this.inputNewItem.current.value));
                                this.inputNewItem.current.value = '';
                            } else {
                                this.props.actions.showError(
                                    this.props.namespace,
                                    true,
                                    validationErrorMessage)
                            }
                        }
                    }>
                        Add {getFormattedLabelText(this.props.componentId)}</button>
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
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectItem: PropTypes.string.isRequired,
    allowAdd: PropTypes.bool.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};
