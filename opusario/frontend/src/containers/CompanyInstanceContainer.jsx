import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanyInstanceComponent from '../components/CompanyInstanceComponent';
import * as CompanyInfoActions from '../actions/CompanyInfo';
import * as GenericActions from '../actions/generic';
import {setSelectValue, setForeignKeyValue} from "../actions/SingleSelect";
import { getCompanyChildState } from '../selectors';


const mapStateToProps = state => {
    return {
        namespace: state.company_instance.namespace,
        componentId: state.company_instance.componentId,
        instanceId: state.company_instance.instanceId,
        childState: getCompanyChildState(state),
        errorMessages: state.company_instance.errorMessages,
        isError: state.company_instance.isError,
        isLoading: state.company_instance.isLoading,
        flashSuccess: state.company_instance.flashSuccess,
        apiRoute: state.company_instance.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...CompanyInfoActions, ...GenericActions}, dispatch),
        childActions: bindActionCreators({ setSelectValue, setForeignKeyValue }, dispatch)
    };
}

const CompanyInstanceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyInstanceComponent);

export default CompanyInstanceContainer;
