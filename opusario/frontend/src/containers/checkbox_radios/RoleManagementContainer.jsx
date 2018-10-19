import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckboxRadioComponent from '../../components/form_components/CheckBoxRadioComponent';
import * as CheckBoxRadioActions from '../../actions/CheckBoxRadio';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.role_management.namespace,
        componentId: state.role_management.componentId,
        inputType: state.role_management.inputType,
        items: state.role_management.items,
        valueChecked: state.role_management.valueChecked,
        errorMessages: state.role_management.errorMessages,
        isError: state.role_management.isError,
        isDisabled: state.role_management.isDisabled,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...CheckBoxRadioActions, ...GenericActions}, dispatch)};
}

const RoleManagementContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckboxRadioComponent);

export default RoleManagementContainer;
