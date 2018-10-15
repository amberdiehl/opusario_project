import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as CityActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.city.namespace,
        componentId: state.city.componentId,
        items: state.city.items,
        selectItem: state.city.selectItem,
        allowAdd: state.city.allowAdd,
        validationRegEx: state.city.validationRegEx,
        regExDescription: state.city.regExDescription,
        errorMessage: state.city.errorMessage,
        isError: state.city.isError,
        isLoading: state.city.isLoading,
        apiRoute: state.city.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...CityActions, ...GenericActions}, dispatch)};
}

const CityContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default CityContainer;