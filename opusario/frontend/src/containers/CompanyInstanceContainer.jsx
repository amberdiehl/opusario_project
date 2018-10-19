import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanyInstanceComponent from '../components/CompanyInstanceComponent';
import * as CompanyInfoActions from '../actions/CompanyInfo';
import * as GenericActions from '../actions/generic';
import {setSelectValue, setForeignKeyValue} from "../actions/SingleSelect";
import { getCompanyChildState } from '../selectors';


const mapStateToProps = state => {
    return {
        ...state.company_instance,
        childState: getCompanyChildState(state)
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
