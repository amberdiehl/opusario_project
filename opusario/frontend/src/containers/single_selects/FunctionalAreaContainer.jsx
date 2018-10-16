import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as FunctionalAreaActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = (state) => {
    return {
        namespace: state.functional_area.namespace,
        componentId: state.functional_area.componentId,
        items: state.functional_area.items,
        defaultValue: state.functional_area.defaultValue,
        selectItem: state.functional_area.selectItem,
        allowAdd: state.functional_area.allowAdd,
        validationRegEx: state.functional_area.validationRegEx,
        regExDescription: state.functional_area.regExDescription,
        hasForeignKey: state.functional_area.hasForeignKey,
        foreignKeyModel: state.functional_area.foreignKeyModel,
        foreignKeyValue: state.functional_area.foreignKeyValue,
        errorMessages: state.functional_area.errorMessages,
        isError: state.functional_area.isError,
        isLoading: state.functional_area.isLoading,
        apiRoute: state.functional_area.apiRoute
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
