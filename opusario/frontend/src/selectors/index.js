import { createSelector } from 'reselect';

// selectors
const getCitySelectItem = (state) => state.city.selectItem;
const getCityNamespace = (state) => state.city.namespace;
const getCompanyName = (state) => state.company_name.inputValue;
const getCompanyNameIsError = (state) => state.company_name.isError;
const getCompanySize = (state) => state.company_size.inputValue;
const getCompanySizeIsError = (state) => state.company_size.isError;
const getCompanyWebsite = (state) => state.company_website.inputValue;
const getCompanyWebsiteIsError = (state) => state.company_website.isError;
const getCountrySelectItem = (state) => state.country.selectItem;
const getCountryNamespace = (state) => state.country.namespace;
const getFunctionalAreaSelectItem = (state) => state.functional_area.selectItem;
const getFunctionalAreaNamespace = (state) => state.functional_area.namespace;
const getIndustrySelectItem = (state) => state.industry.selectItem;
const getIndustryNamespace = (state) => state.industry.namespace;
const getRoleDescription = (state) => state.role_description.inputValue;
const getRoleDescriptionIsError = (state) => state.role_description.isError;
const getRoleDescriptionNamespace = (state) => state.role_description.namespace;
const getRoleLeadership = (state) => state.role_leadership.valueChecked;
const getRoleLeadershipNamespace = (state) => state.role_leadership.namespace;
const getRoleManagement = (state) => state.role_management.valueChecked;
const getRoleManagementNamespace = (state) => state.role_management.namespace;
const getRoleName = (state) => state.role_name.inputValue;
const getRoleNameIsError = (state) => state.role_name.isError;
const getRoleNameNamespace = (state) => state.role_name.namespace;
// const getRoleSelectItem = (state) => state.role_select.selectItem;
// const getRoleSelectNamespace = (state) => state.role_select.namespace;
const getSkillName = (state) => state.skill_name.inputValue;
const getSkillNameIsError = (state) => state.skill_name.isError;
const getSkillSelectItems = (state) => state.skill_select.selectItems;
const getSkillSelectNamespace = (state) => state.skill_select.namespace;
const getSkillVersion = (state) => state.skill_version.inputValue;
const getSkillVersionIsError = (state) => state.skill_version.isError;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getStateNamespace = (state) => state.state_name.namespace;
const getToolSelectItems = (state) => state.tool_select.selectItems;
const getToolSelectNamespace = (state) => state.tool_select.namespace;

// reselect functions
export const getCompanyChildState = createSelector(
  [ getCitySelectItem, getCityNamespace, getStateSelectItem, getStateNamespace,
      getCountrySelectItem, getCountryNamespace, getCompanyName, getCompanyNameIsError,
      getCompanyWebsite, getCompanyWebsiteIsError, getIndustrySelectItem, getIndustryNamespace,
      getCompanySize, getCompanySizeIsError
  ],
  (citySelectItem, cityNamespace, stateSelectItem, stateNamespace,
   countrySelectItem, countryNamespace, companyName, companyNameIsError,
   companyWebsite, companyWebsiteIsError, industrySelectItem, industryNamespace,
   companySize, companySizeIsError) => {
      return ({
          citySelectItem,
          cityNamespace,
          stateSelectItem,
          stateNamespace,
          countrySelectItem,
          countryNamespace,
          companyName,
          companyNameIsError,
          companyWebsite,
          companyWebsiteIsError,
          industrySelectItem,
          industryNamespace,
          companySize,
          companySizeIsError
      });
  }
);

export const getRoleChildState = createSelector(
    [ getFunctionalAreaSelectItem, getFunctionalAreaNamespace, getRoleName, getRoleNameIsError, getRoleNameNamespace,
    getRoleDescription, getRoleDescriptionIsError, getRoleLeadership, getRoleManagement,
    getSkillSelectNamespace, getSkillSelectItems, getToolSelectNamespace, getToolSelectItems],
    (functionalAreaSelectItem, functionalAreaNamespace, roleName, roleNameIsError,
     roleDescription, roleDescriptionIsError, roleLeadership, roleManagement,
     skillNamespace, skillSelectItems, toolNamespace, toolSelectItems) => {
        return ({
            functionalAreaSelectItem,
            functionalAreaNamespace,
            roleName,
            roleNameIsError,

            roleDescription,
            roleDescriptionIsError,
            roleLeadership,
            roleManagement,
            skillNamespace,
            skillSelectItems,
            toolNamespace,
            toolSelectItems
        });
    }
);

export const getSkillChildState = createSelector(
    [getSkillName, getSkillNameIsError, getSkillVersion, getSkillVersionIsError],
    (skillName, skillNameIsError, skillVersion, skillVersionIsError) => {
        return ({
            skillName,
            skillNameIsError,
            skillVersion,
            skillVersionIsError
        });
    }
);
