import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ManySelectComponent from '../../components/form_components/ManySelectComponent';
import * as ManySelectActions from '../../actions/ManySelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = (state) => {
    return {
        ...state.skill_select
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...ManySelectActions, ...GenericActions}, dispatch)};
}

const SkillSelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManySelectComponent);

export default SkillSelectContainer;
