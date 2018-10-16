import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as CountryActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';

const mapStateToProps = state => {
    return {
        namespace: state.country.namespace,
        componentId: state.country.componentId,
        items: state.country.items,
        selectItem: state.country.selectItem,
        allowAdd: state.country.allowAdd,
        validationRegEx: state.country.validationRegEx,
        regExDescription: state.country.regExDescription,
        errorMessages: state.country.errorMessages,
        isError: state.country.isError,
        isLoading: state.country.isLoading,
        apiRoute: state.country.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...CountryActions, ...GenericActions}, dispatch)};
}

const CountryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default CountryContainer;
