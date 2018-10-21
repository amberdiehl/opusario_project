import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SkillNameContainer from '../../containers/inputs/SkillNameContainer';
import SkillVersionContainer from '../../containers/inputs/SkillVersionContainer';
import FlashSuccessIcon from '../form_snippets/FlashSuccessIcon';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class SkillInstanceComponent extends Component {
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
                "name": this.props.childState.skillName,
                "version": this.props.childState.skillVersion
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        if (this.props.childState.skillNameIsError) {
            errorMessages.push('Skill name is not valid.')
        } else {
            if (this.props.childState.skillName.length === 0) {
                errorMessages.push('Skill name is required.')
            }
        }
        if (this.props.childState.skillVersionIsError) {
            errorMessages.push('Skill version is not valid.')
        }
        this.props.actions.showError(this.props.namespace, (errorMessages.length !== 0), errorMessages);
        return (errorMessages.length === 0);
    }
    render() {
        const buttonLabel = (this.props.instanceId === '') ? 'Add' : 'Update';
        return(
            <form>
                <h2>Skill</h2>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                <div className={"form-field-group"}>
                    <SkillNameContainer/>
                    <SkillVersionContainer/>
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
