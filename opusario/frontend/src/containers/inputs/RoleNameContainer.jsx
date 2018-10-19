import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InputComponent from '../../components/form_components/InputComponent';
import * as InputActions from '../../actions/Input';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.role_name.namespace,
        componentId: state.role_name.componentId,
        inputType: state.role_name.inputType,
        inputSize: state.role_name.inputSize,
        inputValue: state.role_name.inputValue,
        validationRegEx: state.role_name.validationRegEx,
        regExDescription: state.role_name.regExDescription,
        errorMessages: state.role_name.errorMessages,
        isError: state.role_name.isError,
        isDisabled: state.role_name.isDisabled,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...InputActions, ...GenericActions}, dispatch)};
}

const RoleNameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputComponent);

export default RoleNameContainer;
