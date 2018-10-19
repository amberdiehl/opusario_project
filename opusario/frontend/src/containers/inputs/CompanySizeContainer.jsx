import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InputComponent from '../../components/form_components/InputComponent';
import * as InputActions from '../../actions/Input';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.company_size.namespace,
        componentId: state.company_size.componentId,
        inputType: state.company_size.inputType,
        inputSize: state.company_size.inputSize,
        inputValue: state.company_size.inputValue,
        validationRegEx: state.company_size.validationRegEx,
        regExDescription: state.company_size.regExDescription,
        errorMessages: state.company_size.errorMessages,
        isError: state.company_size.isError,
        isDisabled: state.company_size.isDisabled,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...InputActions, ...GenericActions}, dispatch)};
}

const CompanySizeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputComponent);

export default CompanySizeContainer;
