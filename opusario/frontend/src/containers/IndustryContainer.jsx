import {connect} from 'react-redux';
import DynamicSelectList from '../components/DynamicSelectList';
import { fetchItems, addItem, setLoading, setSelectValue } from '../actions/industry';


const mapStateToProps = state => {
    return {
        componentId: state.industry.componentId,
        items: state.industry.items,
        selectItem: state.industry.selectItem,
        allowAdd: state.industry.allowAdd,
        validationRegEx: state.industry.validationRegEx,
        isLoading: state.industry.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (text) => {
            dispatch(addItem(text));
        },
        fetchItems: () => {
            dispatch(fetchItems());
        },
        setLoading: (value) => {
            dispatch(setLoading(value));
        },
        setSelectValue: (value) => {
            dispatch(setSelectValue(value));
        }
    };
};

const IndustryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicSelectList);

export default IndustryContainer;
