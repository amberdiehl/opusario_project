import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormattedInputComponentErrors } from '../../helpers';

import InputComponent from '../form_components/InputComponent';
import CitySelectContainer from '../../containers/single_selects/CitySelectContainer';
import CountryContainer from '../../containers/single_selects/CountryContainer';
import IndustryContainer from '../../containers/single_selects/IndustryContainer';
import StateContainer from '../../containers/single_selects/StateContainer';
import FlashSuccessIcon from '../form_snippets/FlashSuccessIcon';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class CompanyInstanceComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
        if (this.props.instanceId !== 0) {
            // Get Company information associated with this instance.
            this.props.actions.fetchItem(this.props.namespace, `${this.props.apiRoute}/${this.props.instanceId}`);
        } else {
            // For a new company, default country selection to United States
            // TODO: Get United States key dynamically (low)
            this.props.childActions.setSelectValue(this.props.childState.countryNamespace, '1');
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        // When instanceID has been provided, the instance is fetched (above) to get current values.
        // Child select components need to have their values set here, after instanceItem has been updated.
        if (nextProps.instanceItem.country !== this.props.instanceItem.country) {
            this.props.childActions.setSelectValue(
                this.props.childState.countryNamespace, nextProps.instanceItem.country);
        }
        if (nextProps.instanceItem.state !== this.props.instanceItem.state) {
            this.props.childActions.setSelectValue(this.props.childState.stateNamespace,
                nextProps.instanceItem.state);
            this.props.childActions.setForeignKeyValue(this.props.childState.stateNamespace,
                nextProps.instanceItem.country);
        }
        if (nextProps.instanceItem.city !== this.props.instanceItem.city) {
            this.props.childActions.setSelectValue(
                this.props.childState.cityNamespace, nextProps.instanceItem.city);
            this.props.childActions.setForeignKeyValue(this.props.childState.cityNamespace,
                nextProps.instanceItem.state);
        }
        if (nextProps.instanceItem.industry !== this.props.instanceItem.industry) {
            this.props.childActions.setSelectValue(
                this.props.childState.industryNamespace, nextProps.instanceItem.industry);
        }
        // Country, State, City are interdependent selects; as selections change, update foreign key values
        // to filter/change selections based on relationship
        if (nextProps.childState.countrySelectItem !== this.props.childState.countrySelectItem) {
            this.props.childActions.setForeignKeyValue(this.props.childState.stateNamespace,
                nextProps.childState.countrySelectItem);
        }
        if (nextProps.childState.stateSelectItem !== this.props.childState.stateSelectItem) {
            this.props.childActions.setForeignKeyValue(this.props.childState.cityNamespace,
                nextProps.childState.stateSelectItem);
        }
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
        console.log('CompanyInstance componentWillUnmount');
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
                ...this.props.instanceItem,
                "city": this.props.childState.citySelectItem,
                "industry": this.props.childState.industrySelectItem,
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        if (this.props.childState.citySelectItem === '0') {
            errorMessages.push('Select or add city.');
        }
        if (this.props.childState.stateSelectItem === '0') {
            errorMessages.push('Select or add state.');
        }
        if (this.props.childState.countrySelectItem === '0') {
            errorMessages.push('Select or add country.');
        }
        if (this.props.childState.industrySelectItem === '0') {
            errorMessages.push('Select or add industry.');
        }
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
                <h2>Company Information</h2>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                <div className={"form-field-group"}>
                    <InputComponent
                        componentId={"CompanyName"}
                        inputValue={this.props.instanceItem.name}
                        validationRegEx={'^[a-zA-Z0-9& ]*$'}
                        regExDescription={'letters, numbers, spaces and ampersand.'}
                        minimumLength={3}
                        maximumLength={128}
                        isRequired={true}
                        showFieldValueErrors={this.props.showFieldValueErrors}
                        action={{...inputComponentAction, key: "name"}}
                    />
                    <CountryContainer/>
                    <StateContainer/>
                    <CitySelectContainer/>
                    <InputComponent
                        componentId={"CompanySize"}
                        inputValue={this.props.instanceItem.size}
                        validationRegEx={'^[0-9]*$'}
                        regExDescription={'whole numbers.'}
                        showFieldValueErrors={this.props.showFieldValueErrors}
                        action={{...inputComponentAction, key: "size"}}
                    />
                    <IndustryContainer/>
                    <InputComponent
                        componentId={"CompanyWebsite"}
                        inputValue={this.props.instanceItem.company_website}
                        validationRegEx={'^[a-zA-Z.:/ ]*$'}
                        regExDescription={'a complete URL such as https://www.opusario.com.'}
                        showFieldValueErrors={this.props.showFieldValueErrors}
                        action={{...inputComponentAction, key: "company_website"}}
                    />
                    <br/><br/>
                    <button className={"button primary small"} onClick={this.buttonOnClick}>{buttonLabel}</button>
                    <FlashSuccessIcon trueFalse={this.props.flashSuccess} />
                </div>
            </form>
        );
    }
}

CompanyInstanceComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    instanceId: PropTypes.number.isRequired,
    instanceItem: PropTypes.object.isRequired,
    childState: PropTypes.object.isRequired,
    showFieldValueErrors: PropTypes.bool.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    flashSuccess: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired,
};
