import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText } from '../../helpers';


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
        const validationErrorMessage = `${this.props.componentId} can only contain ${this.props.regExDescription}`;
        let isValid = this.props.validationRegEx.test(this.state.currentValue);
        if (!isValid) {
            this.props.actions.showError(this.props.namespace, true, validationErrorMessage);
        } else {
            this.props.actions.showError(this.props.namespace, false, validationErrorMessage);
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
                <div className={"row"} style={(this.props.isError) ? {display: "block"} : {display: "none"}}>
                    <div className="col-10 component-error-message">
                        {this.props.errorMessage}
                    </div>
                </div>
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
    errorMessage: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};
