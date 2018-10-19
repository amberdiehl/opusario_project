import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckboxRadioComponent from '../../components/form_components/CheckBoxRadioComponent';
import * as CheckBoxRadioActions from '../../actions/CheckBoxRadio';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        ...state.role_leadership
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...CheckBoxRadioActions, ...GenericActions}, dispatch)};
}

const RoleLeadershipContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckboxRadioComponent);

export default RoleLeadershipContainer;
