import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ToolInstanceComponent from '../../components/instances/ToolInstanceComponent';
import * as InstanceActions from '../../actions/Instance';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        ...state.tool_instance,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...InstanceActions, ...GenericActions}, dispatch),
    };
}

const ToolInstanceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolInstanceComponent);

export default ToolInstanceContainer;
