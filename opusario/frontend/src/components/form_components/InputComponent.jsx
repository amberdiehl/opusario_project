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
    componentDidMount() {
        // Immediately cycle through field validation. This is done to immediately capture required fields and prevent
        // user from being able to immediately submit the form without entering them.
        this.validateValue(this.props.inputValue);
    }
    shouldComponentUpdate(nextProps, nextState) {
        /* Facebook strongly discourages the use of shouldComponentUpdate but in looking at the number events firing,
           and since this will be used extensively, the 'noise' it will create might be a real performance issue.

           The conditions below capture:
           1. Don't update when doing the behind the scenes validation (pendingErrorMessages).
           2. Don't update when inputValue hasn't changed...and the follow are true:
                a. showFieldValueErrors has not been triggered,
                b. There are no new or past error messages.
         */
        return !((nextState.pendingErrorMessages !== this.state.pendingErrorMessages) ||
            ((nextProps.inputValue === this.props.inputValue) &&
            ((nextProps.showFieldValueErrors === false) && (this.props.showFieldValueErrors === false)) &&
            ((nextState.errorMessages.length === 0) && (this.state.errorMessages.length === 0))));
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        /* A new input value is only received when the inputValue does not contain an invalid character. In that case
           ensure current error state is reset to none.
         */
        if (nextProps.inputValue !== this.props.inputValue) {
            // Due to asynchronous communication, clearing error state needs to be tied to receipt of new inputValue.
            this.setState({
                ...this.state,
                isError: false,
                errorMessages: []
            }, () => {
                /* Checking for pending errors which will be shown upon parent request (submit button) must be executed
                   via the call back, otherwise adding pending errors causes the above state change to revert to its
                   prior (error) state.
                 */
                this.validateValue(nextProps.inputValue);
            });
        }
        // When parent asks to see field value errors, move pending error messages to current error state to show them.
        // They will remain showing until user clicks submit again.
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
        // Default isValid based on non-textarea input assumption; re-evaluate if input is 'textarea' since 'pattern' is
        // not allowed for that input type.
        let isValid = e.target.validity.valid;
        if (this.props.inputType === 'textarea') {
            let validationRegEx = new RegExp(this.props.validationRegEx);
            isValid = validationRegEx.test(e.target.value);
        }
        // Invalid characters are trapped and not allowed into state.
        if (isValid) {
            let newInputValue = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
            // Valid characters are pushed to parent instanceItem; this creates a 'feedback' loop to this component's
            // inputValue property.
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
        if (typeof this.props.minimumLength === "number") {
            if (newInputValue.length < this.props.minimumLength) {
                hasErrors = true;
                pendingErrors.push(`${errorElement} is less than the minimum length ${this.props.minimumLength}.`)
            }
        }
        if (typeof this.props.maximumLength === "number") {
            if (newInputValue.length > this.props.maximumLength) {
                hasErrors = true;
                pendingErrors.push(`${errorElement} is more than the maximum length ${this.props.maximumLength}.`)
            }
        }
        if (this.props.isRequired) {
            if (newInputValue.length === 0) {
                hasErrors = true;
                pendingErrors.push(`${errorElement} is required.`)
            }
        }
        this.setState({
            ...this.state,
            pendingErrorMessages: pendingErrors
        });
        // Let the parent know that there are errors so that a person cannot submit the form.
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
                            onChange={this.handleOnChange}
                            value={this.props.inputValue}
                            readOnly={this.props.isDisabled}
                        />
                    <FormErrorMessages trueFalse={this.state.isError} messages={this.state.errorMessages}/>
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
                    <FormErrorMessages trueFalse={this.state.isError} messages={this.state.errorMessages}/>
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
            </div>
        );
    }
}

InputComponent.propTypes = {
    componentId: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    inputSize: PropTypes.number,
    inputValue: PropTypes.any.isRequired,  // Set by parent state--though component does update parent through action.
    validationRegEx: PropTypes.string, // Since regular expression is used in property 'pattern', pass as string.
    regExDescription: PropTypes.string,
    isRequired: PropTypes.bool,
    isDisabled: PropTypes.bool,
    showFieldValueErrors: PropTypes.bool.isRequired,  // Set by parent state
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
