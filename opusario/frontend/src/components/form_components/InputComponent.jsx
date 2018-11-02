import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText } from '../../helpers';
import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentId: this.props.componentId,
            inputType: (typeof this.props.inputType === "undefined") ? 'text' : this.props.inputType,
            inputSize: (typeof this.props.inputSize === "undefined") ? 250 : this.props.inputSize,
            inputValue: this.props.inputValue,
            validationRegEx: (typeof this.props.validationRegEx === "undefined") ? /^[a-zA-Z ]*$/ :
                this.props.validationRegEx,
            regExDescription: (typeof this.props.regExDescription === "undefined") ? "letters and spaces." :
                this.props.regExDescription,
            isRequired: (typeof this.props.isRequired === "undefined") ? false : this.props.isRequired,
            showFieldValueErrors: (typeof this.props.showFieldValueErrors === "undefined") ? false :
                this.props.showFieldValueErrors,
            errorMessages: (typeof this.props.errorMessages === "undefined") ? [] : this.props.errorMessages,
            pendingErrorMessages: [],
            isError: (typeof this.props.isError === "undefined") ? false : this.props.isError,
            isDisabled: (typeof this.props.isDisabled === "undefined") ? false : this.props.isDisabled,
        };
        this.renderInputByType = this.renderInputByType.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.validateValue = this.validateValue.bind(this);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.inputValue !== this.props.inputValue) {
            this.setState({
                ...this.state,
                inputValue: nextProps.inputValue
            });
        }
        if (nextProps.showFieldValueErrors) {
            console.log('you are here');
            console.log(this.state);
            if (this.state.pendingErrorMessages.length > 0) {
                this.setState({
                    ...this.state,
                    isErrors: true,
                    errorMessages: this.state.errorMessages.push.apply(
                        this.state.errorMessages, this.state.pendingErrorMessages)
                });
            }
        }
    }
    handleOnChange(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            inputValue: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value,
        }, this.validateValue);
    }
    validateValue() {
        let errorMessages = [];
        let pendingErrorMessages = [];
        let hasErrors = false;
        const errorElement = getFormattedLabelText(this.state.componentId);
        // Validate each character as its input and let user know if not valid immediately.
        let isValid = this.state.validationRegEx.test(this.state.inputValue);
        if (!isValid) {
            hasErrors = true;
            errorMessages.push(`${errorElement} can only contain ${this.state.regExDescription}`);
        }
        // Validate based on field level requirements such as min, max values or min, max length
        if (typeof this.props.minimumValue !== "undefined") {
            if (this.state.inputValue < this.props.minimumValue) {
                hasErrors = true;
                pendingErrorMessages.push(`${errorElement} is less than the minimum value ${this.props.minimumValue}.`)
            }
        }
        if (typeof this.props.maximumValue !== "undefined") {
            if (this.state.inputValue > this.props.maximumValue) {
                hasErrors = true;
                pendingErrorMessages.push(`${errorElement} is more than the maximum value ${this.props.minimumValue}.`)
            }
        }
        // Update local and parent state with result of validation; i.e. throw error, keep status quo, or clear error.
        this.setState({
            ...this.state,
            isError: (errorMessages.length !== 0),
            errorMessages: errorMessages,
            pendingErrorMessages: pendingErrorMessages,
        });
        this.props.action.setItemValue(this.props.action.namespace,
            "inputErrors", {[this.props.action.key]: hasErrors});

        // Update parent state with current value only when valid
        if (errorMessages.length === 0) {
            this.props.action.setItemValue(this.props.action.namespace, this.props.action.key, this.state.inputValue);
        }
    }
    renderInputByType() {
        switch(this.state.inputType) {
            case 'textarea': {
                return (
                    <div className="col-6 col-6-xsmall">
                        <textarea id={this.state.componentId} cols={this.state.inputSize}
                            placeholder={getFormattedLabelText(this.state.componentId)}
                            readOnly={this.state.isDisabled}
                            onChange={this.handleOnChange}
                            value={this.state.inputValue} />
                    </div>
                );
            }
            default: {
                return (
                    <div className="col-6 col-6-xsmall">
                        <input id={this.state.componentId}
                            type={this.state.inputType} style={{width: this.state.inputSize}}
                            placeholder={getFormattedLabelText(this.state.componentId)}
                            value={this.state.inputValue}
                            disabled={this.state.isDisabled}
                            onChange={this.handleOnChange}
                        />
                    </div>
                );
            }
        }
    }
    render() {
        return (
            <div className={"row gtr-0 gtr-uniform"}>
                <FormFieldLabel componentId={this.state.componentId}/>
                {this.renderInputByType()}
                <FormErrorMessages trueFalse={this.state.isError} messages={this.state.errorMessages}/>
            </div>
        );
    }
}

InputComponent.propTypes = {
    componentId: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    inputSize: PropTypes.number,
    inputValue: PropTypes.any.isRequired,  // Shared with parent state
    validationRegEx: PropTypes.any, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string,
    isRequired: PropTypes.bool,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    minimumLength: PropTypes.number,
    maximumLength: PropTypes.number,
    showFieldValueErrors: PropTypes.bool,  // Set by parent state
    errorMessages: PropTypes.array,
    isError: PropTypes.bool,
    isDisabled: PropTypes.bool,
    action: PropTypes.object.isRequired
};
