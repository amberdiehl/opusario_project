import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText } from '../../helpers';
import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: this.props.inputValue
        };
        this.renderInputByType = this.renderInputByType.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.validateValue = this.validateValue.bind(this);
    }
    handleOnChange(e) {
        e.preventDefault();
        this.setState({
            currentValue: e.target.value,
        }, this.validateValue);
    }
    validateValue() {
        let errorMessages = [];
        const validationErrorMessage =
            `${getFormattedLabelText(this.props.componentId)} can only contain ${this.props.regExDescription}`;
        let isValid = this.props.validationRegEx.test(this.state.currentValue);
        if (!isValid) {
            errorMessages.push(validationErrorMessage);
            this.props.actions.showError(this.props.namespace, true, errorMessages);
        } else {
            this.props.actions.showError(this.props.namespace, false, errorMessages);
            this.props.actions.setInputValue(this.props.namespace, this.state.currentValue);
        }
    }
    renderInputByType() {
        switch(this.props.inputType) {
            case 'textarea': {
                return (
                    <div className="col-6 col-6-xsmall">
                        <textarea id={this.props.componentId} cols={this.props.inputSize}
                            placeholder={getFormattedLabelText(this.props.componentId)}
                            readOnly={this.props.isDisabled}
                            onChange={this.handleOnChange}>
                            {this.state.currentValue}
                        </textarea>
                    </div>
                );
            }
            default: {
                return (
                    <div className="col-6 col-6-xsmall">
                        <input id={this.props.componentId}
                            type={this.props.inputType} style={{width: this.props.inputSize}}
                            placeholder={getFormattedLabelText(this.props.componentId)}
                            value={this.state.currentValue}
                            disabled={this.props.isDisabled}
                            onChange={this.handleOnChange}
                        />
                    </div>
                );
            }
        }
    }
    render() {
        return (
            <div className={"row gtr-uniform"}>
                <FormFieldLabel componentId={this.props.componentId}/>
                {this.renderInputByType()}
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
            </div>
        );
    }
}

InputComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    inputSize: PropTypes.number.isRequired,
    inputValue: PropTypes.string.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};
