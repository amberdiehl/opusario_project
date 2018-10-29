import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText, getTextAsTitleCase } from '../../helpers';
import FormFieldLabel from '../form_snippets/FormFieldLabel';
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
        // Automatically load options; filter options by foreign key if present.
        let apiRoute = this.props.apiRoute;
        if (this.props.hasForeignKey) {
            apiRoute = `${apiRoute}?filter=${this.props.foreignKeyValue}`;
        }
        this.props.actions.fetchItems(this.props.namespace, apiRoute);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        // When foreign key changes due to parent component control, fetch new values.
        if (nextProps.foreignKeyValue !== this.props.foreignKeyValue) {
            let apiRoute = `${this.props.apiRoute}?filter=${nextProps.foreignKeyValue}`;
            this.props.actions.fetchItems(this.props.namespace, apiRoute);
        }
    }
    renderSelectField() {
        return (
                <select id={`select${this.props.componentId}`}
                    disabled={this.props.isLoading}
                    value={this.props.selectItem}
                    onChange={(event) => {
                        this.props.actions.setSelectValue(this.props.namespace, event.target.value);
                        this.props.actions.showError(this.props.namespace, false, [])
                    }}>
                    {this.props.items.map(item => (
                        <option key={`select${this.props.componentId}-${item.id}`} value={item.id}>
                            {(item.id === 0) ? item.name : (this.props.hasCompositeName) ?
                                item.composite_name : item.name}
                        </option>
                    ))}
                </select>
        )
    }
    renderAddInput() {
        if (this.props.allowAdd) {
            return (
                <input type={"text"} ref={this.inputNewItem}
                    placeholder={`New ${getFormattedLabelText(this.props.componentId)}`}/>
            )
        }
    }
    renderAddButton() {
        if (this.props.allowAdd) {
            let errorMessages = [];
            const validationErrorMessage =
                `${getFormattedLabelText(this.props.componentId)} can only contain ${this.props.regExDescription}`;
            return (
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
                        }}>
                    Add {getFormattedLabelText(this.props.componentId)}
                </button>
            )
        }
    }
    render() {
        return (
            <div className={"row gtr-0 gtr-uniform"}>
                <FormFieldLabel componentId={this.props.componentId}/>
                <div className={"col-3 col-3-fixed-width"}>
                    {this.renderSelectField()}
                </div>
                <div className={"col-3 col-3-fixed-width"}>
                    {this.renderAddInput()}
                </div>
                <div className={"col-3 col-3-fixed-width"}>
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
    defaultValue: PropTypes.object.isRequired, // The default starting value (e.g. please select) to self populate.
    selectItem: PropTypes.string.isRequired,
    allowAdd: PropTypes.bool.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    hasForeignKey: PropTypes.bool.isRequired,
    foreignKeyModel: PropTypes.string.isRequired,
    foreignKeyValue: PropTypes.string.isRequired,
    hasCompositeName: PropTypes.bool.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};
