import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InputComponent from '../../components/form_components/InputComponent';
import * as InputActions from '../../actions/Input';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.company_website.namespace,
        componentId: state.company_website.componentId,
        inputType: state.company_website.inputType,
        inputSize: state.company_website.inputSize,
        inputValue: state.company_website.inputValue,
        validationRegEx: state.company_website.validationRegEx,
        regExDescription: state.company_website.regExDescription,
        errorMessages: state.company_website.errorMessages,
        isError: state.company_website.isError,
        isDisabled: state.company_website.isDisabled,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...InputActions, ...GenericActions}, dispatch)};
}

const CompanyWebsiteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputComponent);

export default CompanyWebsiteContainer;
