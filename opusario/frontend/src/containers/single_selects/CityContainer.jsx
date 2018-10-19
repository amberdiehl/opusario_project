import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as CityActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';


const mapStateToProps = state => {
    return {
        ...state.city
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
