import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWrapperComponent from '../../components/wrappers/ModalWrapperComponent';
import * as ModalWrapperActions from '../../actions/ModalWrapper';


const mapStateToProps = (state) => {
    return {
        ...state.skill_modal
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(ModalWrapperActions, dispatch)};
}

const SkillModalWrapperContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalWrapperComponent);

export default SkillModalWrapperContainer;
