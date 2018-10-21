import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SkillInstanceComponent from '../../components/instances/SkillInstanceComponent';
import * as InstanceActions from '../../actions/Instance';
import * as GenericActions from '../../actions/generic';
import { getSkillChildState } from '../../selectors/index';


const mapStateToProps = state => {
    return {
        ...state.skill_instance,
        childState: getSkillChildState(state)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...InstanceActions, ...GenericActions}, dispatch),
    };
}

const SkillInstanceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SkillInstanceComponent);

export default SkillInstanceContainer;
