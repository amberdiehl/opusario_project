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
            validationRegEx: (typeof this.props.validationRegEx === "undefined")
                ? /^[a-zA-Z ]*$/ : this.props.validationRegEx,
            regExDescription: (typeof this.props.regExDescription === "undefined")
                ? "letters and spaces." : this.props.regExDescription,
            errorMessages: (typeof this.props.errorMessages === "undefined") ? [] : this.props.errorMessages,
            isError: (typeof this.props.isError === "undefined") ? false : this.props.isError,
            isDisabled: (typeof this.props.isDisabled === "undefined") ? false : this.props.isDisabled,
        };
        this.renderInputByType = this.renderInputByType.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.validateValue = this.validateValue.bind(this);
    }
    handleOnChange(e) {
        e.preventDefault();
        this.setState({
            inputValue: e.target.value,
        }, this.validateValue);
    }
    validateValue() {
        let errorMessages = [];
        const validationErrorMessage =
            `${getFormattedLabelText(this.state.componentId)} can only contain ${this.state.regExDescription}`;
        let isValid = this.state.validationRegEx.test(this.state.inputValue);
        if (!isValid) {
            errorMessages.push(validationErrorMessage);
        }
        this.setState({...this.state, errorMessages: errorMessages});
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
    inputValue: PropTypes.string.isRequired,
    validationRegEx: PropTypes.any, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string,
    errorMessages: PropTypes.array,
    isError: PropTypes.bool,
    isDisabled: PropTypes.bool,
};
