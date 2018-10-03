import { combineReducers } from 'redux';
import city from './City';
import country from './Country';
import functional_area from './FunctionalArea';
import industry from './Industry';
import myself from './myself';
import role_description from './RoleDescription';
import state_name from './State';


const OpusarioReducers = combineReducers({
    city,
    country,
    functional_area,
    industry,
    myself,
    role_description,
    state_name,
});

export default OpusarioReducers;