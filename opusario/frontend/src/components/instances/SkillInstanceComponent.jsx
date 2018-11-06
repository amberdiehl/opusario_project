import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormattedInputComponentErrors } from '../../helpers';

import InputComponent from '../form_components/InputComponent';
import FlashSuccessIcon from '../form_snippets/FlashSuccessIcon';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class SkillInstanceComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
        if (this.props.instanceId !== 0) {
            this.props.actions.fetchItem(this.props.namespace, `${this.props.apiRoute}/${this.props.instanceId}`);
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    }
    componentDidUpdate(prevProps, prevState) {
        // **** IMPORTANT ***********************************************
        // This must be included here when instance uses InputComponent.
        if ((prevProps.showFieldValueErrors !== this.props.showFieldValueErrors) && (this.props.showFieldValueErrors)) {
            this.props.actions.setShowFieldValueErrors(this.props.namespace, false);
        }
        // *******************
    }
    componentWillUnmount() {
        console.log('SkillInstance componentWillUnmount');
    }
    buttonOnClick(e) {
        e.preventDefault();
        // **** IMPORTANT ***********************************************
        // This must be included here when instance uses InputComponent.
        this.props.actions.setShowFieldValueErrors(this.props.namespace, true);
        // *******************
        let isValid = this.validateForm();
        if (isValid) {
            const method = (this.props.instanceId === 0) ? 'POST' : 'PUT';
            const apiRoute = (method === 'POST') ? this.props.apiRoute :
                `${this.props.apiRoute}/${this.props.instanceId}`;
            const data = {
                "name": this.props.instanceItem.name,
                "version": this.props.instanceItem.version
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        // **** IMPORTANT ***********************************************
        // This must be included here when instance uses InputComponent.
        errorMessages = getFormattedInputComponentErrors(this.props.instanceItem.inputErrors, errorMessages);
        // *******************
        this.props.actions.showError(this.props.namespace, (errorMessages.length !== 0), errorMessages);
        return (errorMessages.length === 0);
    }
    render() {
        const buttonLabel = (this.props.instanceId === 0) ? 'Add' : 'Update';
        // **** IMPORTANT ***********************************************
        // This must be included here when instance uses InputComponent.
        const inputComponentAction = {
            setItemValue: this.props.actions.setItemValue,
            namespace: this.props.namespace
        };
        // *******************
        return(
            <form>
                <h2>Skill</h2>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                <div className={"form-field-group"}>
                    <InputComponent
                        componentId={"Name"}
                        inputValue={this.props.instanceItem.name}
                        validationRegEx={'^[a-zA-Z0-9+ ]*$'}
                        regExDescription={'letters, numbers, plus signs, and spaces.'}
                        isRequired={true}
                        showFieldValueErrors={this.props.showFieldValueErrors}
                        action={{...inputComponentAction, key: "name"}}
                    />
                    <InputComponent
                        componentId={"Version"}
                        inputValue={this.props.instanceItem.version}
                        validationRegEx={'^[a-zA-Z0-9. ]*$'}
                        regExDescription={'letters, numbers, periods, and spaces.'}
                        showFieldValueErrors={this.props.showFieldValueErrors}
                        action={{...inputComponentAction, key: "version"}}
                    />
                    <br/><br/>
                    <button className={"button primary small"} onClick={this.buttonOnClick}>{buttonLabel}</button>
                    <FlashSuccessIcon trueFalse={this.props.flashSuccess} />
                </div>
            </form>
        );
    }
}

SkillInstanceComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    instanceId: PropTypes.number.isRequired,
    instanceItem: PropTypes.object.isRequired,
    childState: PropTypes.object,
    showFieldValueErrors: PropTypes.bool.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    flashSuccess: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object
};
