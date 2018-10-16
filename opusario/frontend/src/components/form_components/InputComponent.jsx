import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText } from '../../helpers';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: this.props.inputValue
        };
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
    render() {
        return (
            <div className={"form-field-group"}>
                <div className={"row gtr-uniform"}>
                    <div className="col-3 col-3-xsmall">
                        <input
                            id={this.props.componentId}
                            type={this.props.inputType} style={{width: this.props.inputSize}}
                            placeholder={getFormattedLabelText(this.props.componentId)}
                            value={this.state.currentValue}
                            disabled={this.props.isDisabled}
                            onChange={this.handleOnChange}
                        />
                    </div>
                </div>
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
