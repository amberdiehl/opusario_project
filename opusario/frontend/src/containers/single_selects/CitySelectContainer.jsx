import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as SingleSelectActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        ...state.city_select
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...SingleSelectActions, ...GenericActions}, dispatch)};
}

const CitySelectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default CitySelectContainer;
