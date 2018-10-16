import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as IndustryActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        namespace: state.industry.namespace,
        componentId: state.industry.componentId,
        items: state.industry.items,
        defaultValue: state.industry.defaultValue,
        selectItem: state.industry.selectItem,
        allowAdd: state.industry.allowAdd,
        validationRegEx: state.industry.validationRegEx,
        regExDescription: state.industry.regExDescription,
        hasForeignKey: state.industry.hasForeignKey,
        foreignKeyModel: state.industry.foreignKeyModel,
        foreignKeyValue: state.industry.foreignKeyValue,
        errorMessages: state.industry.errorMessages,
        isError: state.industry.isError,
        isLoading: state.industry.isLoading,
        apiRoute: state.industry.apiRoute
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...IndustryActions, ...GenericActions}, dispatch)};
}

const IndustryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default IndustryContainer;
