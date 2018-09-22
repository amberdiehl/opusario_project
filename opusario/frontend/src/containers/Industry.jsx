import {connect} from 'react-redux';
import DynamicSelectList from '../components/DynamicSelectList';

const mapStateToProps = state => {
    return {
        componentId: state.industry.componentId,
        componentName: state.industry.componentName,
        items: state.industry.items
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const Industry = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicSelectList);

export default Industry;
