import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        this.props.childActions.setSelectValue(this.props.childState.countryNamespace, '1');
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.childState.countrySelectItem !== this.props.childState.countrySelectItem) {
            this.props.childActions.setForeignKeyValue(
                this.props.childState.stateNamespace,
                nextProps.childState.countrySelectItem);
        }
        if (nextProps.childState.stateSelectItem !== this.props.childState.stateSelectItem) {
            this.props.childActions.setForeignKeyValue(
                this.props.childState.cityNamespace,
                nextProps.childState.stateSelectItem);
        }
    }
    buttonOnClick(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if (isValid) {
            const method = (this.props.instanceId === 0) ? 'POST' : 'PUT';
            const apiRoute = (method === 'POST') ? this.props.apiRoute :
                `${this.props.apiRoute}/${this.props.instanceId}`;
            const data = {
                "name": this.props.childState.companyName,
                "city": this.props.childState.citySelectItem,
                "company_size": this.props.childState.companySize,
                "industry": this.props.childState.industrySelectItem,
                "company_website": this.props.childState.companyWebsite
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        if (this.props.childState.companyName.length === 0) {
            errorMessages.push('Enter a company name.');
        }
        if (this.props.childState.companyNameIsError) {
            errorMessages.push('Company name is not valid.');
        }
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
        if (this.props.childState.companyWebsiteIsError) {
            errorMessages.push('Company website is not valid.');
        }
        this.props.actions.showError(this.props.namespace, (errorMessages.length !== 0), errorMessages);
        return (errorMessages.length === 0);
    }
    render() {
        const buttonLabel = (this.props.instanceId === 0) ? 'Add' : 'Update';
        const baseAction = {
            setItemValue: this.props.actions.setItemValue,
            namespace: this.props.namespace
        };
        return(
            <form>
                <h2>Company Information</h2>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                <div className={"form-field-group"}>
                    <InputComponent
                        componentId={"CompanyName"}
                        inputValue={this.props.instanceItem.name}
                        action={{...baseAction, key: "name"}}
                    />
                    <CountryContainer/>
                    <StateContainer/>
                    <CitySelectContainer/>
                    <InputComponent
                        componentId={"CompanySize"}
                        inputValue={this.props.instanceItem.size}
                        validationRegEx={/^[0-9]*$/}
                        regExDescription={"whole numbers."}
                        action={{...baseAction, key: "size"}}
                    />
                    <IndustryContainer/>
                    <InputComponent
                        componentId={"CompanyWebsite"}
                        inputValue={this.props.instanceItem.company_website}
                        validationRegEx={/^[a-zA-Z ]*$/}
                        regExDescription={"letters and spaces."}
                        action={{...baseAction, key: "company_website"}}
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
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    flashSuccess: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired,
};
