import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedLabelText } from '../../helpers';
import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMessages: [],
            pendingErrorMessages: []
        };
        this.renderInputByType = this.renderInputByType.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.validateValue = this.validateValue.bind(this);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        /* A new input value is only received when the inputValue does not contain an invalid character. In that case
           ensure current error state is reset to none.
         */
        if (nextProps.inputValue !== this.props.inputValue) {
            this.setState({
                ...this.state,
                isError: false,
                errorMessages: []
            }, () => {
                /* Checking for pending errors which will be shown upon parent request (submit button) must be executed
                   via the call back, otherwise adding pending errors causes the above state change to revert to its
                   prior state.
                 */
                this.validateValue(nextProps.inputValue);
            });
        }
        // When parent asks to see field value errors, move pending error messages to current error state to show them.
        if ((nextProps.showFieldValueErrors !== this.props.showFieldValueErrors) && (nextProps.showFieldValueErrors)) {
            if (this.state.pendingErrorMessages.length > 0) {
                this.setState({
                    ...this.state,
                    isError: true,
                    errorMessages: this.state.pendingErrorMessages
                });
            }
        }
    }
    handleOnChange(e) {
        e.preventDefault();
        if (e.target.validity.valid) {
            let newInputValue = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
            this.props.action.setItemValue(this.props.action.namespace, this.props.action.key, newInputValue);
        } else {
            let m = `${getFormattedLabelText(this.props.componentId)} can only contain ${this.props.regExDescription}`;
            this.setState({
                ...this.state,
                isError: true,
                errorMessages: [m]
            })
        }
    }
    validateValue(newInputValue) {
        /* The newInputValue is checked every time against field level constraints / validators. This is done since,
           at any give time a user could click the submit button. When the user does click submit, the parent will
           change the showFieldValidationErrors to true which will cause any pending error messages to show (see above).
         */
        let hasErrors = false;
        let pendingErrors = [];
        const errorElement = getFormattedLabelText(this.props.componentId);

        if (typeof this.props.minimumValue === "number") {
            if (newInputValue < this.props.minimumValue) {
                hasErrors = true;
                pendingErrors.push(`${errorElement} is less than the minimum value ${this.props.minimumValue}.`)
            }
        }
        if (typeof this.props.maximumValue === "number") {
            if (newInputValue > this.props.maximumValue) {
                hasErrors = true;
                pendingErrors.push(`${errorElement} is more than the maximum value ${this.props.maximumValue}.`)
            }
        }

        this.setState({
            ...this.state,
            pendingErrorMessages: pendingErrors
        });
        this.props.action.setItemValue(this.props.action.namespace,
            "inputErrors", {[this.props.action.key]: hasErrors});
    }
    renderInputByType() {
        switch(this.props.inputType) {
            case 'textarea': {
                return (
                    <div className="col-6 col-6-xsmall">
                        <textarea id={this.props.componentId} cols={this.props.inputSize}
                            placeholder={getFormattedLabelText(this.props.componentId)}
                            pattern={this.props.validationRegEx}
                            onChange={this.handleOnChange}
                            value={this.props.inputValue}
                            readOnly={this.props.isDisabled}
                        />
                    </div>
                );
            }
            default: {
                return (
                    <div className="col-6 col-6-xsmall">
                        <input id={this.props.componentId}
                            type={'text'}
                            style={{width: this.props.inputSize}}
                            placeholder={getFormattedLabelText(this.props.componentId)}
                            pattern={this.props.validationRegEx}
                            onChange={this.handleOnChange}
                            value={this.props.inputValue}
                            disabled={this.props.isDisabled}
                        />
                    </div>
                );
            }
        }
    }
    render() {
        return (
            <div className={"row gtr-0 gtr-uniform"}>
                <FormFieldLabel componentId={this.props.componentId}/>
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
    validationRegEx: PropTypes.string, // Since regular expression is used in property 'pattern', pass as string.
    regExDescription: PropTypes.string,
    isRequired: PropTypes.bool,
    showFieldValueErrors: PropTypes.bool.isRequired,  // Set by parent state
    isDisabled: PropTypes.bool,
    action: PropTypes.object.isRequired,
    /* The values below are optional and without default. When the property is not provided, it will have a value
       'undefined'. This prevents the edit from being performed. Otherwise, if it exists, it must be provided with
       the desired value--there cannot be a default.
     */
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    minimumLength: PropTypes.number,
    maximumLength: PropTypes.number,
};
InputComponent.defaultProps = {
    inputType: 'text',
    inputSize: 250,
    validationRegEx: '^[a-zA-Z ]*$',
    regExDescription: 'letters and spaces.',
    isRequired: false,
    isDisabled: false
};
