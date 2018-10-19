import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FunctionalAreaContainer from '../containers/single_selects/FunctionalAreaContainer';
import RoleDescriptionContainer from '../containers/inputs/RoleDescriptionContainer';
import RoleNameContainer from '../containers/inputs/RoleNameContainer';
import FlashSuccessIcon from './form_snippets/FlashSuccessIcon';
import FormErrorMessages from './form_snippets/FormErrorMessages';


export default class RoleInstanceComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    }
    buttonOnClick(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if (isValid) {
            const method = (this.props.instanceId === '') ? 'POST' : 'PUT';
            const apiRoute = (method === 'POST') ? this.props.apiRoute :
                `${this.props.apiRoute}/${this.props.instanceId}`;
            const data = {
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        this.props.actions.showError(this.props.namespace, (errorMessages.length !== 0), errorMessages);
        return (errorMessages.length === 0);
    }
    render() {
        const buttonLabel = (this.props.instanceId === '') ? 'Add' : 'Update';
        return(
            <form>
                <h2>Role</h2>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                <div className={"form-field-group"}>
                    <FunctionalAreaContainer/>
                    <RoleNameContainer/>
                    <RoleDescriptionContainer/>
                    <br/><br/>
                    <button className={"button primary small"} onClick={this.buttonOnClick}>{buttonLabel}</button>
                    <FlashSuccessIcon trueFalse={this.props.flashSuccess} />
                </div>
            </form>
        );
    }
}

RoleInstanceComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    instanceId: PropTypes.string.isRequired,
    childState: PropTypes.object.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    flashSuccess: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    childActions: PropTypes.object.isRequired,
};
