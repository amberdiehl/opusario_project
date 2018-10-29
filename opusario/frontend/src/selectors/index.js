import { createSelector } from 'reselect';

// selectors
const getCitySelectItem = (state) => state.city_select.selectItem;
const getCityNamespace = (state) => state.city_select.namespace;
const getCompanySelectItem = (state) => state.company_select.selectItem;
const getCompanyNamespace = (state) => state.company_select.namespace;
const getCountrySelectItem = (state) => state.country.selectItem;
const getCountryNamespace = (state) => state.country.namespace;
const getFunctionalAreaSelectItem = (state) => state.functional_area.selectItem;
const getFunctionalAreaNamespace = (state) => state.functional_area.namespace;
const getIndustrySelectItem = (state) => state.industry.selectItem;
const getIndustryNamespace = (state) => state.industry.namespace;
const getRoleLeadership = (state) => state.role_leadership.valueChecked;
const getRoleLeadershipNamespace = (state) => state.role_leadership.namespace;
const getRoleManagement = (state) => state.role_management.valueChecked;
const getRoleManagementNamespace = (state) => state.role_management.namespace;
// const getRoleSelectItem = (state) => state.role_select.selectItem;
// const getRoleSelectNamespace = (state) => state.role_select.namespace;
const getSkillInstanceInstanceId = (state) => state.skill_instance.instanceId;
const getSkillInstanceNamespace = (state) => state.skill_instance.namespace;
const getSkillModalNamespace = (state) => state.skill_modal.namespace;
//const getSkillSelectItems = (state) => state.skill_select.selectItems;
const getSkillSelectNamespace = (state) => state.skill_select.namespace;
const getSkillSelectRoute = (state) => state.skill_select.apiRoute;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getStateNamespace = (state) => state.state_name.namespace;
const getToolInstanceInstanceId = (state) => state.tool_instance.instanceId;
const getToolInstanceNamespace = (state) => state.tool_instance.namespace;
const getToolModalNamespace = (state) => state.tool_modal.namespace;
//const getToolSelectItems = (state) => state.tool_select.selectItems;
const getToolSelectNamespace = (state) => state.tool_select.namespace;
const getToolSelectRoute = (state) => state.tool_select.apiRoute;

// reselect functions
export const getCompanyChildState = createSelector(
  [ getCitySelectItem, getCityNamespace, getStateSelectItem, getStateNamespace,
      getCountrySelectItem, getCountryNamespace, getIndustrySelectItem, getIndustryNamespace
  ],
  (citySelectItem, cityNamespace, stateSelectItem, stateNamespace,
   countrySelectItem, countryNamespace, industrySelectItem, industryNamespace) => {
      return ({
          citySelectItem,
          cityNamespace,
          stateSelectItem,
          stateNamespace,
          countrySelectItem,
          countryNamespace,
          industrySelectItem,
          industryNamespace
      });
  }
);

export const getProjectChildState = createSelector(
    [getCompanySelectItem, getCompanyNamespace],
    (companySelectItem, companyNamespace) => {
        return ({
            companySelectItem,
            companyNamespace
        })
    }
);

export const getRoleChildState = createSelector(
    [ getFunctionalAreaSelectItem, getFunctionalAreaNamespace, getRoleLeadership, getRoleLeadershipNamespace,
        getRoleManagement, getRoleManagementNamespace],
    (functionalAreaSelectItem, functionalAreaNamespace, roleLeadership, roleLeadershipNamespace,
     roleManagement, roleManagementNamespace) => {
        return ({
            functionalAreaSelectItem,
            functionalAreaNamespace,
            roleLeadership,
            roleLeadershipNamespace,
            roleManagement,
            roleManagementNamespace
        });
    }
);

export const getSkillModalChildState = createSelector(
    [getSkillInstanceInstanceId, getSkillInstanceNamespace, getSkillSelectNamespace, getSkillSelectRoute,
        getSkillModalNamespace],
    (instanceId, instanceNamespace, manySelectNamespace, manySelectRoute,
     modalNamespace) => {
        return ({
            instanceId,
            instanceNamespace,
            manySelectNamespace,
            manySelectRoute,
            modalNamespace
        })
    }
);

export const getToolModalChildState = createSelector(
    [getToolInstanceInstanceId, getToolInstanceNamespace, getToolSelectNamespace, getToolSelectRoute,
        getToolModalNamespace],
    (instanceId, instanceNamespace, manySelectNamespace, manySelectRoute,
     modalNamespace) => {
        return ({
            instanceId,
            instanceNamespace,
            manySelectNamespace,
            manySelectRoute,
            modalNamespace
        })
    }
);
