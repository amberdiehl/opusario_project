import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as SingleSelectActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = (state) => {
    return {
        ...state.role_select
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...SingleSelectActions, ...GenericActions}, dispatch)};
}

const RoleSelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default RoleSelectContainer;
