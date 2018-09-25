import {connect} from 'react-redux';
import DynamicSelectList from '../components/DynamicSelectList';
import { fetchItems, addItem, setLoading } from '../actions/industry';


const mapStateToProps = state => {
    return {
        componentId: state.industry.componentId,
        items: state.industry.items,
        selectedItem: state.industry.selectedItem,
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
        }
    };
};

const IndustryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicSelectList);

export default IndustryContainer;
