import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyNameContainer from '../containers/inputs/CompanyNameContainer';
import CityContainer from '../containers/single_selects/CityContainer';
import CountryContainer from '../containers/single_selects/CountryContainer';
import StateContainer from '../containers/single_selects/StateContainer';


export default class CompanyInfoComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.childActions.setSelectValue(this.props.childState.cityNamespace, '5');
    }
    render() {
        return(
            <form>
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
            </form>
        );
    }
}

CompanyInfoComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    companyNameIsError: PropTypes.bool.isRequired,
    childState: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired,
};