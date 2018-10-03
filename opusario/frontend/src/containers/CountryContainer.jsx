import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../components/SingleSelectComponent';
import * as CountryActions from '../actions/SingleSelect';

const mapStateToProps = state => {
    return {
        namespace: state.country.namespace,
        componentId: state.country.componentId,
        items: state.country.items,
        selectItem: state.country.selectItem,
        allowAdd: state.country.allowAdd,
        validationRegEx: state.country.validationRegEx,
        regExDescription: state.country.regExDescription,
        errorMessage: state.country.errorMessage,
        isError: state.country.isError,
        isLoading: state.country.isLoading,
        apiRoute: state.country.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(CountryActions, dispatch)};
}

const CountryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default CountryContainer;
