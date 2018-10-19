import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as StateActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        ...state.state_name
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...StateActions, ...GenericActions}, dispatch)};
}

const StateNameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default StateNameContainer;
