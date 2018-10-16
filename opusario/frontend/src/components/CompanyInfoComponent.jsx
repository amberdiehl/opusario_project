import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyNameContainer from '../containers/inputs/CompanyNameContainer';
import CityContainer from '../containers/single_selects/CityContainer';
import CountryContainer from '../containers/single_selects/CountryContainer';
import StateContainer from '../containers/single_selects/StateContainer';
import CompanyWebsiteContainer from '../containers/inputs/CompanyWebsiteContainer';
import FlashSuccessIcon from './form_snippets/FlashSuccessIcon';
import FormErrorMessages from './form_snippets/FormErrorMessages';


export default class CompanyInfoComponent extends Component {
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
            const method = (this.props.companyId === '') ? 'POST' : 'PUT';
            const apiRoute = (method === 'POST') ? this.props.apiRoute :
                `${this.props.apiRoute}/${this.props.companyId}`;
            this.props.actions.addOrUpdateItem(
                this.props.namespace,
                apiRoute,
                method,
                this.props.childState.companyName,
                this.props.childState.citySelectItem,
                this.props.childState.stateSelectItem,
                this.props.childState.countrySelectItem,
                this.props.childState.companyWebsite);
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
        if (this.props.childState.companyWebsiteIsError) {
            errorMessages.push('Company website is not valid.');
        }
        this.props.actions.showError(this.props.namespace, (errorMessages.length !== 0), errorMessages);
        return (errorMessages.length === 0);
    }
    render() {
        const buttonLabel = (this.props.companyId === '') ? 'Add' : 'Update';
        return(
            <form>
                <h2>Company Information</h2>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                <div className={"form-field-group"}>
                    <div className={"row gtr-uniform"}>
                        <CompanyNameContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <CountryContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <StateContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <CityContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <CompanyWebsiteContainer/>
                    </div>
                    <button className={"button primary small"} onClick={this.buttonOnClick}>{buttonLabel}</button>
                    <FlashSuccessIcon trueFalse={this.props.flashSuccess} />
               </div>
            </form>
        );
    }
}

CompanyInfoComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    companyId: PropTypes.string.isRequired,
    childState: PropTypes.object.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    flashSuccess: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired,
};
