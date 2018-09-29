import { combineReducers } from 'redux';
import functional_area from './FunctionalArea';
import industry from './Industry';
import myself from './myself';


const OpusarioReducers = combineReducers({
    functional_area,
    industry,
    myself
});

export default OpusarioReducers;