import { createSelector } from 'reselect';

// selectors
const getCitySelectItem = (state) => state.city_select.selectItem;
const getCityNamespace = (state) => state.city_select.namespace;
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
const getSkillSelectItems = (state) => state.skill_select.selectItems;
const getSkillSelectNamespace = (state) => state.skill_select.namespace;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getStateNamespace = (state) => state.state_name.namespace;
const getToolSelectItems = (state) => state.tool_select.selectItems;
const getToolSelectNamespace = (state) => state.tool_select.namespace;

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

export const getRoleChildState = createSelector(
    [ getFunctionalAreaSelectItem, getFunctionalAreaNamespace, getRoleLeadership, getRoleLeadershipNamespace,
        getRoleManagement, getRoleManagementNamespace, getSkillSelectItems, getSkillSelectNamespace,
        getToolSelectItems, getToolSelectNamespace],
    (functionalAreaSelectItem, functionalAreaNamespace, roleLeadership, roleLeadershipNamespace,
     roleManagement, roleManagementNamespace, skillSelectItems, skillNamespace,
     toolSelectItems, toolNamespace) => {
        return ({
            functionalAreaSelectItem,
            functionalAreaNamespace,
            roleLeadership,
            roleLeadershipNamespace,
            roleManagement,
            roleManagementNamespace,
            skillSelectItems,
            skillNamespace,
            toolSelectItems,
            toolNamespace,
        });
    }
);
