import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InputComponent from '../../components/form_components/InputComponent';
import * as InputActions from '../../actions/Input';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.company_name.namespace,
        componentId: state.company_name.componentId,
        inputType: state.company_name.inputType,
        inputSize: state.company_name.inputSize,
        inputValue: state.company_name.inputValue,
        validationRegEx: state.company_name.validationRegEx,
        regExDescription: state.company_name.regExDescription,
        errorMessages: state.company_name.errorMessages,
        isError: state.company_name.isError,
        isDisabled: state.company_name.isDisabled,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...InputActions, ...GenericActions}, dispatch)};
}

const CompanyNameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputComponent);

export default CompanyNameContainer;
