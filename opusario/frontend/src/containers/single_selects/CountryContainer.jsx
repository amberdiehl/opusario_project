import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleSelectComponent from '../../components/form_components/SingleSelectComponent';
import * as CountryActions from '../../actions/SingleSelect';
import * as GenericActions from '../../actions/generic';

const mapStateToProps = state => {
    return {
        ...state.country
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({...CountryActions, ...GenericActions}, dispatch)};
}

const CountryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSelectComponent);

export default CountryContainer;
