import { combineReducers } from 'redux';
import city, {getCitySelectedItem} from './City';
import company_info from './CompanyInfo';
import country from './Country';
import functional_area from './FunctionalArea';
import industry from './Industry';
import myself from './myself';
import role_description from './RoleDescription';
import state_name from './State';


const OpusarioReducers = combineReducers({
    city,
    company_info,
    country,
    functional_area,
    industry,
    myself,
    role_description,
    state_name,
});

export const getSelectedItemsForCompany = (state) => ({
   city: getCitySelectedItem(state)
});

export default OpusarioReducers;