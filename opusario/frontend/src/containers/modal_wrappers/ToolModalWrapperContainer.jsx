import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalWrapperComponent from '../../components/wrappers/ModalWrapperComponent';
import * as ModalWrapperActions from '../../actions/ModalWrapper';


const mapStateToProps = (state) => {
    return {
        ...state.tool_modal
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(ModalWrapperActions, dispatch)};
}

const ToolModalWrapperContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalWrapperComponent);

export default ToolModalWrapperContainer;
