import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InputComponent from '../components/InputComponent';
import * as RoleDescriptionActions from '../actions/Input';

const mapStateToProps = state => {
    return {
        namespace: state.role_description.namespace,
        componentId: state.role_description.componentId,
        placeholder: state.role_description.placeholder,
        textValue: state.role_description.textValue,
        validationRegEx: state.role_description.validationRegEx,
        regExDescription: state.role_description.regExDescription,
        errorMessage: state.role_description.errorMessage,
        isError: state.role_description.isError,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(RoleDescriptionActions, dispatch)};
}

const RoleDescriptionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputComponent);

export default RoleDescriptionContainer;
