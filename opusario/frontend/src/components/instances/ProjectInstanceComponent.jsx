import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { getFormattedInputComponentErrors } from '../../helpers';

import InputComponent from '../form_components/InputComponent';
import CompanySelectContainer from '../../containers/single_selects/CompanySelectContainer';
import FlashSuccessIcon from '../form_snippets/FlashSuccessIcon';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class ProjectInstanceComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
        if (this.props.instanceId !== 0) {
            // Get Project information associated with this instance.
            this.props.actions.fetchItem(this.props.namespace, `${this.props.apiRoute}/${this.props.instanceId}`);
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        // When instanceID has changed, update stateful child components.
        if (nextProps.instanceId !== this.props.instanceId) {
            this.props.actions.fetchItem(this.props.namespace, `${this.props.apiRoute}/${nextProps.instanceId}`);
        }
        if (nextProps.instanceItem.company !== this.props.instanceItem.company) {
            this.props.childActions.setSelectValue(this.props.childState.companyNamespace,
                nextProps.instanceItem.company);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // IMPORTANT: This needs to be included for all instance components.
        if ((prevProps.showFieldValueErrors !== this.props.showFieldValueErrors) && (this.props.showFieldValueErrors)) {
            this.props.actions.setShowFieldValueErrors(this.props.namespace, false);
        }
    }
    componentWillUnmount() {
        console.log('ProjectInstance componentWillUnmount');
    }
    buttonOnClick(e) {
        e.preventDefault();
        this.props.actions.setShowFieldValueErrors(this.props.namespace, true);
        let isValid = this.validateForm();
        if (isValid) {
            const method = (this.props.instanceId === 0) ? 'POST' : 'PUT';
            const apiRoute = (method === 'POST') ? this.props.apiRoute :
                `${this.props.apiRoute}/${this.props.instanceId}`;
            const data = {
                ...this.props.instanceItem,
                "company": this.props.childState.companySelectItem,
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        if (this.props.childState.companySelectItem === '0') {
            errorMessages.push('Add or select a company.');
        }
        if (this.props.instanceItem.name.length === 0) {
            errorMessages.push('Enter a name for this project');
        }
        errorMessages = getFormattedInputComponentErrors(this.props.instanceItem.inputErrors, errorMessages);
        this.props.actions.showError(this.props.namespace, (errorMessages.length !== 0), errorMessages);
        return (errorMessages.length === 0);
    }
    render() {
        const buttonLabel = (this.props.instanceId === 0) ? 'Add' : 'Update';
        const inputComponentAction = {
            setItemValue: this.props.actions.setItemValue,
            namespace: this.props.namespace
        };
        return(
            <Fragment>
                <form>
                    <h2>Project</h2>
                    <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                    <div className={"form-field-group"}>
                        <CompanySelectContainer/>
                        <InputComponent
                            componentId={"StartYear"}
                            inputValue={this.props.instanceItem.start_year}
                            validationRegEx={'^[0-9]*$'}
                            regExDescription={`a year, e.g. ${(new Date()).getFullYear()}.`}
                            minimumValue={(new Date()).getFullYear()-70}
                            maximumValue={(new Date()).getFullYear()}
                            showFieldValueErrors={this.props.showFieldValueErrors}
                            isRequired={true}
                            action={{...inputComponentAction, key: "start_year"}}
                        />
                        <br/><br/>
                        <button className={"button primary small"} onClick={this.buttonOnClick}>{buttonLabel}</button>
                        <FlashSuccessIcon trueFalse={this.props.flashSuccess} />
                    </div>
                </form>
           </Fragment>
        );
    }
}

ProjectInstanceComponent.propTypes = {
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
