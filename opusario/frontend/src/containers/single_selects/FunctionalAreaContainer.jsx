import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as FunctionalAreaActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = (state) => {
    return {
        ...state.functional_area
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...FunctionalAreaActions, ...GenericActions}, dispatch)};
}

const FunctionalAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default FunctionalAreaContainer;
