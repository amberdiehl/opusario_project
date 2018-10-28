import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalButtonComponent from '../../components/form_components/MagicModalButton';
import { resetModalInstance } from '../../actions/Instance';
import { fetchItems, addSelectItem } from "../../actions/ManySelect";
import { setShowModal } from "../../actions/ModalWrapper";
import { getSkillModalChildState } from '../../selectors/index';


const mapStateToProps = state => {
    return {
        childState: getSkillModalChildState(state)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        childActions: bindActionCreators(
            { setShowModal, fetchItems, addSelectItem, resetModalInstance }, dispatch)
    };
}

const SkillModalButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalButtonComponent);

export default SkillModalButtonContainer;
