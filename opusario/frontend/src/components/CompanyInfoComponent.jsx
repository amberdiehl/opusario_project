import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CityContainer from '../containers/CityContainer';
import CountryContainer from '../containers/CountryContainer';
import StateContainer from '../containers/StateContainer';


export default class CompanyInfoComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return(
            <div className={"form-field-group"}>
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
        );
    }
}

CompanyInfoComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    selectItems: PropTypes.object.isRequired,
    validationRegEx: PropTypes.any.isRequired, // Not clear on how to indicate this is a RegEx.
    regExDescription: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};