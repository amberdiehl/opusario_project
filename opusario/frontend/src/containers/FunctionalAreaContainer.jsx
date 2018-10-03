import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../components/SingleSelectComponent';
import * as FunctionalAreaActions from '../actions/SingleSelect';


const mapStateToProps = (state) => {
    return {
        namespace: state.functional_area.namespace,
        componentId: state.functional_area.componentId,
        items: state.functional_area.items,
        selectItem: state.functional_area.selectItem,
        allowAdd: state.functional_area.allowAdd,
        validationRegEx: state.functional_area.validationRegEx,
        regExDescription: state.functional_area.regExDescription,
        errorMessage: state.functional_area.errorMessage,
        isError: state.functional_area.isError,
        isLoading: state.functional_area.isLoading,
        apiRoute: state.functional_area.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(FunctionalAreaActions, dispatch)};
}

const FunctionalAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default FunctionalAreaContainer;
