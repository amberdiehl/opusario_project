import { combineReducers } from 'redux';
import city from './single_selects/City';
import company_instance from './CompanyInstance';
import company_name from './inputs/CompanyName';
import company_size from './inputs/CompanySize';
import company_website from './inputs/CompanyWebsite';
import country from './single_selects/Country';
import functional_area from './single_selects/FunctionalArea';
import industry from './single_selects/Industry';
import myself from './myself';
import role_instance from './RoleInstance';
import role_description from './inputs/RoleDescription';
import role_leadership from './checkbox_radios/RoleLeadership';
import role_management from './checkbox_radios/RoleManagement';
import role_name from './inputs/RoleName';
import state_name from './single_selects/State';


const OpusarioReducers = combineReducers({
    city,
    company_instance,
    company_name,
    company_size,
    company_website,
    country,
    functional_area,
    industry,
    myself,
    role_instance,
    role_description,
    role_leadership,
    role_management,
    role_name,
    state_name,
});

export default OpusarioReducers;
