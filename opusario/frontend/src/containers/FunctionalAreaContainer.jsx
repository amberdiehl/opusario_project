import {connect} from 'react-redux';
import DynamicSelectList from '../components/DynamicSelectList';
import { fetchItems, addItem, setLoading, setSelectValue, showError } from '../actions/DynamicSelectList';


const mapStateToProps = state => {
    return {
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

const mapDispatchToProps = dispatch => {
    return {
        addItem: (apiRoute, text) => {
            dispatch(addItem(apiRoute, text));
        },
        fetchItems: (apiRoute) => {
            dispatch(fetchItems(apiRoute));
        },
        setLoading: (value) => {
            dispatch(setLoading(value));
        },
        setSelectValue: (value) => {
            dispatch(setSelectValue(value));
        },
        showError: (trueFalse, message) => {
            dispatch(showError(trueFalse, message));
        },
    };
};

const FunctionalAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicSelectList);

export default FunctionalAreaContainer;
