import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RoleInstanceComponent from '../components/RoleInstanceComponent';
import * as InstanceActions from '../actions/Instance';
import * as GenericActions from '../actions/generic';
import { setSelectValue, setForeignKeyValue } from "../actions/SingleSelect";
import { getRoleChildState } from '../selectors';


const mapStateToProps = state => {
    return {
        namespace: state.role_instance.namespace,
        componentId: state.role_instance.componentId,
        instanceId: state.role_instance.instanceId,
        childState: getRoleChildState(state),
        errorMessages: state.role_instance.errorMessages,
        isError: state.role_instance.isError,
        isLoading: state.role_instance.isLoading,
        flashSuccess: state.role_instance.flashSuccess,
        apiRoute: state.role_instance.apiRoute
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
