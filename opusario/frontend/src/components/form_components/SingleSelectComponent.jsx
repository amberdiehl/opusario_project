import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText, getTextAsTitleCase } from '../../helpers';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class SingleSelectComponent extends Component {
    constructor(props) {
        super(props);
        this.inputNewItem = React.createRef();
        this.renderSelectField = this.renderSelectField.bind(this);
        this.renderAddInput = this.renderAddInput.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
    }
    componentDidMount() {
        let apiRoute = this.props.apiRoute;
        if (this.props.hasForeignKey) {
            apiRoute = `${apiRoute}?filter=${this.props.foreignKeyValue}`;
        }
        this.props.actions.fetchItems(this.props.namespace, apiRoute);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.foreignKeyValue !== this.props.foreignKeyValue) {
            let apiRoute = `${this.props.apiRoute}?filter=${nextProps.foreignKeyValue}`;
            this.props.actions.fetchItems(this.props.namespace, apiRoute);
        }
    }
    renderSelectField() {
        return (
            <div className={"col-6 col-12-xsmall"}>
                <select id={`select${this.props.componentId}`}
                    disabled={this.props.isLoading}
                    value={this.props.selectItem}
                    onChange={(event) => {
                        this.props.actions.setSelectValue(this.props.namespace, event.target.value);
                        this.props.actions.showError(this.props.namespace, false, [])
                    }
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
            let errorMessages = [];
            const validationErrorMessage =
                `${getFormattedLabelText(this.props.componentId)} can only contain ${this.props.regExDescription}`;
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
                                    getTextAsTitleCase(this.inputNewItem.current.value),
                                    this.props.foreignKeyModel,
                                    this.props.foreignKeyValue);
                                this.inputNewItem.current.value = '';
                            } else {
                                errorMessages.push(validationErrorMessage);
                                this.props.actions.showError(
                                    this.props.namespace,
                                    true,
                                    errorMessages)
                            }
                        }
                    }>
                        Add {getFormattedLabelText(this.props.componentId)}</button>
                </div>
            )
        }
    }
    render() {
        return (
            <div className={"form-field-group"}>
                <div className={"row gtr-uniform"}>
                    {this.renderSelectField()}
                    {this.renderAddInput()}
                    {this.renderAddButton()}
                </div>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
            </div>
        );
    }
}

SingleSelectComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    defaultValue: PropTypes.string.isRequired,
    selectItem: PropTypes.string.isRequired,
    allowAdd: PropTypes.bool.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    hasForeignKey: PropTypes.bool.isRequired,
    foreignKeyModel: PropTypes.string.isRequired,
    foreignKeyValue: PropTypes.string.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};
