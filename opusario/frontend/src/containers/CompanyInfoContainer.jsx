import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanyInfoComponent from '../components/CompanyInfoComponent';
import * as CompanyInfoActions from '../actions/CompanyInfo';
import * as GenericActions from '../actions/generic';
import {setSelectValue} from "../actions/SingleSelect";
import { getCompanySelectItemsState } from '../selectors';


const mapStateToProps = state => {
    return {
        namespace: state.company_info.namespace,
        componentId: state.company_info.componentId,
        companyNameIsError: state.company_info.companyNameIsError,
        childState: getCompanySelectItemsState(state),
        errorMessage: state.company_info.errorMessage,
        isError: state.company_info.isError,
        isLoading: state.company_info.isLoading,
        apiRoute: state.company_info.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...CompanyInfoActions, ...GenericActions}, dispatch),
        childActions: bindActionCreators({setSelectValue}, dispatch)
    };
}

const CompanyInfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyInfoComponent);

export default CompanyInfoContainer;
