import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanyInfoComponent from '../components/CompanyInfoComponent';
import * as CompanyInfoActions from '../actions/CompanyInfo';
import { getCitySelectedItem } from '../reducers/City';


const mapStateToProps = state => {
    return {
        namespace: state.company_info.namespace,
        componentId: state.company_info.componentId,
        citySelectedItem: getCitySelectedItem(state),
        validationRegEx: state.company_info.validationRegEx,
        regExDescription: state.company_info.regExDescription,
        errorMessage: state.company_info.errorMessage,
        isError: state.company_info.isError,
        isLoading: state.company_info.isLoading,
        apiRoute: state.company_info.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(CompanyInfoActions, dispatch)};
}

const CompanyInfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyInfoComponent);

export default CompanyInfoContainer;
