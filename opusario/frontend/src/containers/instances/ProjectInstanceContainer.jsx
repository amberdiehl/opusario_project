import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectInstanceComponent from '../../components/instances/ProjectInstanceComponent';
import * as InstanceActions from '../../actions/Instance';
import * as GenericActions from '../../actions/generic';
import { setSelectValue } from "../../actions/SingleSelect";
import { getProjectChildState } from '../../selectors/index';


const mapStateToProps = state => {
    return {
        ...state.project_instance,
        childState: getProjectChildState(state)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...InstanceActions, ...GenericActions}, dispatch),
        childActions: bindActionCreators(
            { setSelectValue }, dispatch)
    };
}

const ProjectInstanceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectInstanceComponent);

export default ProjectInstanceContainer;
