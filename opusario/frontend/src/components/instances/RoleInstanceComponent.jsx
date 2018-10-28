import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { getFormattedInputComponentErrors } from '../../helpers';

import InputComponent from '../form_components/InputComponent';
import FunctionalAreaContainer from '../../containers/single_selects/FunctionalAreaContainer';
import RoleLeadershipContainer from '../../containers/checkbox_radios/RoleLeadershipContainer';
import RoleManagementContainer from '../../containers/checkbox_radios/RoleManagementContainer';
import FlashSuccessIcon from '../form_snippets/FlashSuccessIcon';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class RoleInstanceComponent extends Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
        if (this.props.instanceId !== 0) {
            // Get Role information associated with this instance.
            this.props.actions.fetchItem(this.props.namespace, `${this.props.apiRoute}/${this.props.instanceId}`);
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        // When instanceID has been provided or changed, update stateful child components.
        if (nextProps.instanceId !== this.props.instanceId) {
            this.props.actions.fetchItem(this.props.namespace, `${this.props.apiRoute}/${nextProps.instanceId}`);
        }
        if (nextProps.instanceItem.functional_area !== this.props.instanceItem.functional_area) {
            this.props.childActions.setSelectValue(this.props.childState.functionalAreaNamespace,
                nextProps.instanceItem.functional_area);
        }
        if (nextProps.instanceItem.management !== this.props.instanceItem.management) {
            this.props.childActions.setCheckedValue(this.props.childState.roleManagementNamespace,
                (nextProps.instanceItem.management) ? 'yes' : 'no');
        }
        if (nextProps.instanceItem.leadership !== this.props.instanceItem.leadership) {
            this.props.childActions.setCheckedValue(this.props.childState.roleLeadershipNamespace,
                (nextProps.instanceItem.leadership) ? 'yes' : 'no');
        }
    }
    componentWillUnmount() {
        console.log('RoleInstance componentWillUnmount');
    }
    buttonOnClick(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if (isValid) {
            const method = (this.props.instanceId === 0) ? 'POST' : 'PUT';
            const apiRoute = (method === 'POST') ? this.props.apiRoute :
                `${this.props.apiRoute}/${this.props.instanceId}`;
            const data = {
                ...this.props.instanceItem,
                "functional_area": this.props.childState.functionalAreaSelectItem,
                "management": (this.props.childState.roleManagement === 'yes'),
                "leadership": (this.props.childState.roleLeadership === 'yes'),
            };
            this.props.actions.addOrUpdateItem(this.props.namespace, apiRoute, method, data);
        }
    }
    validateForm(){
        let errorMessages = [];
        if (this.props.childState.functionalAreaSelectItem === '0') {
            errorMessages.push('Add or select a functional area.');
        }
        if (this.props.instanceItem.name.length === 0) {
            errorMessages.push('Enter a name for this role; e.g. Software Engineer, Product Manager, Copy Writer, ' +
                'Customer Service Associate.');
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
                    <h2>Role</h2>
                    <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
                    <div className={"form-field-group"}>
                        <FunctionalAreaContainer/>
                        <InputComponent
                            componentId={"RoleName"}
                            inputValue={this.props.instanceItem.name}
                            action={{...inputComponentAction, key: "name"}}
                        />
                        <InputComponent
                            componentId={"RoleDescription"}
                            inputType={"textarea"}
                            inputValue={this.props.instanceItem.description}
                            validationRegEx={/^[a-zA-Z0-9,.; ]*$/}
                            regExDescription={"letters, numbers, and punctuation marks: comma, period, and semicolon."}
                            action={{...inputComponentAction, key: "description"}}
                        />
                        <RoleManagementContainer/>
                        <RoleLeadershipContainer/>
                        <br/><br/>
                        <button className={"button primary small"} onClick={this.buttonOnClick}>{buttonLabel}</button>
                        <FlashSuccessIcon trueFalse={this.props.flashSuccess} />
                    </div>
                </form>
           </Fragment>
        );
    }
}

RoleInstanceComponent.propTypes = {
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
