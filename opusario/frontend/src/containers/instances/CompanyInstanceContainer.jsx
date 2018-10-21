import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanyInstanceComponent from '../../components/instances/CompanyInstanceComponent';
import * as InstanceActions from '../../actions/Instance';
import * as GenericActions from '../../actions/generic';
import {setSelectValue, setForeignKeyValue} from "../../actions/SingleSelect";
import { getCompanyChildState } from '../../selectors/index';


const mapStateToProps = state => {
    return {
        ...state.company_instance,
        childState: getCompanyChildState(state)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...InstanceActions, ...GenericActions}, dispatch),
        childActions: bindActionCreators({ setSelectValue, setForeignKeyValue }, dispatch)
    };
}

const CompanyInstanceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyInstanceComponent);

export default CompanyInstanceContainer;
