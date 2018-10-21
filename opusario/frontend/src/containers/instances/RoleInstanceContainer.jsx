import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RoleInstanceComponent from '../../components/instances/RoleInstanceComponent';
import * as InstanceActions from '../../actions/Instance';
import * as GenericActions from '../../actions/generic';
import { setSelectValue, setForeignKeyValue } from "../../actions/SingleSelect";
import { getRoleChildState } from '../../selectors/index';


const mapStateToProps = state => {
    return {
        ...state.role_instance,
        childState: getRoleChildState(state)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...InstanceActions, ...GenericActions}, dispatch),
        childActions: bindActionCreators({ setSelectValue, setForeignKeyValue }, dispatch)
    };
}

const RoleInstanceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleInstanceComponent);

export default RoleInstanceContainer;
