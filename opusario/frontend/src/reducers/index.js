import { combineReducers } from 'redux';
import industry from "./Industry";
import myself from "./myself";


const OpusarioReducers = combineReducers({
    industry,
    myself
});

export default OpusarioReducers;