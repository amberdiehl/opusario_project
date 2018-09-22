import { combineReducers } from 'redux';
import industry from "./industry";
import myself from "./myself";


const OpusarioReducers = combineReducers({
    industry,
    myself
});

export default OpusarioReducers;