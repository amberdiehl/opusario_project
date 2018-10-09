import { combineReducers } from 'redux';
import city from './single_selects/City';
import company_info from './CompanyInfo';
import company_name from './inputs/CompanyName';
import country from './single_selects/Country';
import functional_area from './single_selects/FunctionalArea';
import industry from './single_selects/Industry';
import myself from './myself';
import state_name from './single_selects/State';


const OpusarioReducers = combineReducers({
    city,
    company_info,
    company_name,
    country,
    functional_area,
    industry,
    myself,
    state_name,
});

export default OpusarioReducers;
