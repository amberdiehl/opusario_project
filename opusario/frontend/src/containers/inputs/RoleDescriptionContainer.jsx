import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InputComponent from '../../components/form_components/InputComponent';
import * as InputActions from '../../actions/Input';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.role_description.namespace,
        componentId: state.role_description.componentId,
        inputType: state.role_description.inputType,
        inputSize: state.role_description.inputSize,
        inputValue: state.role_description.inputValue,
        validationRegEx: state.role_description.validationRegEx,
        regExDescription: state.role_description.regExDescription,
        errorMessages: state.role_description.errorMessages,
        isError: state.role_description.isError,
        isDisabled: state.role_description.isDisabled,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...InputActions, ...GenericActions}, dispatch)};
}

const RoleDescriptionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputComponent);

export default RoleDescriptionContainer;
