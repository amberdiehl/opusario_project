import {connect} from 'react-redux';
import DynamicSelectList from '../components/DynamicSelectList';
import { fetchItems } from '../actions/dynamic_select_list';


const mapStateToProps = state => {
    return {
        componentId: state.industry.componentId,
        items: state.industry.items,
        route: state.industry.route,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: () => {
            dispatch(fetchItems());
        }
    };
};

const Industry = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicSelectList);

export default Industry;
