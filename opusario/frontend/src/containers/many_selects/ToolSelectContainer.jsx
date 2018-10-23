import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ManySelectComponent from '../../components/form_components/ManySelectComponent';
import * as ManySelectActions from '../../actions/ManySelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = (state) => {
    return {
        ...state.tool_select
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...ManySelectActions, ...GenericActions}, dispatch)};
}

const ToolSelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManySelectComponent);

export default ToolSelectContainer;
