import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DynamicSelectList from '../components/DynamicSelectList';
import * as IndustryActions from '../actions/DynamicSelectList';

const mapStateToProps = state => {
    return {
        namespace: state.industry.namespace,
        componentId: state.industry.componentId,
        items: state.industry.items,
        selectItem: state.industry.selectItem,
        allowAdd: state.industry.allowAdd,
        validationRegEx: state.industry.validationRegEx,
        regExDescription: state.industry.regExDescription,
        errorMessage: state.industry.errorMessage,
        isError: state.industry.isError,
        isLoading: state.industry.isLoading,
        apiRoute: state.industry.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(IndustryActions, dispatch)};
}

const IndustryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicSelectList);

export default IndustryContainer;
