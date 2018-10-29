import { combineReducers } from 'redux';

import city_select from './single_selects/CitySingleSelect';
import company_instance from './instances/CompanyInstance';
import company_select from './single_selects/CompanySingleSelect';
import country from './single_selects/Country';
import functional_area from './single_selects/FunctionalArea';
import industry from './single_selects/Industry';
import myself from './myself';
import project_instance from './instances/ProjectInstance';
import role_instance from './instances/RoleInstance';
import role_leadership from './checkbox_radios/RoleLeadership';
import role_management from './checkbox_radios/RoleManagement';
import role_select from './single_selects/RoleSelect';
import skill_instance from './instances/SkillInstance';
import skill_modal from './modal_wrappers/SkillModalWrapper';
import skill_select from './many_selects/SkillManySelect';
import state_name from './single_selects/State';
import tool_instance from './instances/ToolInstance';
import tool_modal from './modal_wrappers/ToolModalWrapper';
import tool_select from './many_selects/ToolManySelect'


const OpusarioReducers = combineReducers({
    city_select,
    company_instance,
    company_select,
    country,
    functional_area,
    industry,
    skill_instance,
    skill_modal,
    skill_select,
    myself,
    project_instance,
    role_select,
    role_instance,
    role_leadership,
    role_management,
    state_name,
    tool_instance,
    tool_modal,
    tool_select
});

export default OpusarioReducers;
