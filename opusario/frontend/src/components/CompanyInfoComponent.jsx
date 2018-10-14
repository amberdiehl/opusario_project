import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyNameContainer from '../containers/inputs/CompanyNameContainer';
import CityContainer from '../containers/single_selects/CityContainer';
import CountryContainer from '../containers/single_selects/CountryContainer';
import StateContainer from '../containers/single_selects/StateContainer';


export default class CompanyInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
        this.props.childActions.setSelectValue(this.props.childState.cityNamespace, '5');
    }
    buttonOnClick(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if (isValid) {
            if (this.props.companyId === '') {
                this.props.actions.addItem(
                    this.props.namespace,
                    this.props.apiRoute,
                    this.props.childState.companyName,
                    this.props.childState.citySelectItem,
                    this.props.childState.stateSelectItem,
                    this.props.childState.countrySelectItem);
            } else {
                this.props.actions.changeItem(
                    this.props.namespace,
                    `${this.props.apiRoute}${this.props.companyId}`,
                    this.props.childState.companyName,
                    this.props.childState.citySelectItem,
                    this.props.childState.stateSelectItem,
                    this.props.childState.countrySelectItem);
            }
        }
    }
    validateForm(){
        let errorMessage = [];
        if (this.props.childState.companyName.length === 0) {
            errorMessage.push('Enter a company name.');
        }
        if (this.props.childState.companyNameIsError) {
            errorMessage.push('Company name is not valid.');
        }
        if (this.props.childState.citySelectItem === '0') {
            errorMessage.push('Select or add city.');
        }
        if (this.props.childState.stateSelectItem === '0') {
            errorMessage.push('Select or add state.');
        }
        if (this.props.childState.countrySelectItem === '0') {
            errorMessage.push('Select or add country.');
        }
        this.props.actions.showError(this.props.namespace, (errorMessage.length !== 0), errorMessage);
        return (errorMessage.length === 0);
    }
    render() {
        const buttonLabel = (this.props.companyId === '') ? 'Add' : 'Update';
        const formErrorMessages = this.props.errorMessages.map((message) => {
            return (
                <p>{message}</p>
            );
        });
        return(
            <form>
                <h2>Company Information</h2>
                <div className={"row"} style={(this.props.isError) ? {display: "block"} : {display: "none"}}>
                    <div className={"col-10 form-error-message"}>
                        {formErrorMessages}
                    </div>
                </div>
                <div className={"form-field-group"}>
                    <div className={"row gtr-uniform"}>
                        <CompanyNameContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <CityContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <StateContainer/>
                    </div>
                    <div className={"row gtr-uniform"}>
                        <CountryContainer/>
                    </div>
                </div>
                <button className={"btn btn-primary"} onClick={this.buttonOnClick}>{buttonLabel}</button>
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
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired,
};