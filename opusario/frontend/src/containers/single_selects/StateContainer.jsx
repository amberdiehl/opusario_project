import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as StateActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.state_name.namespace,
        componentId: state.state_name.componentId,
        items: state.state_name.items,
        selectItem: state.state_name.selectItem,
        allowAdd: state.state_name.allowAdd,
        validationRegEx: state.state_name.validationRegEx,
        regExDescription: state.state_name.regExDescription,
        errorMessages: state.state_name.errorMessages,
        isError: state.state_name.isError,
        isLoading: state.state_name.isLoading,
        apiRoute: state.state_name.apiRoute
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
