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
const getRoleLeadership = (state) => state.role_leadership.valueChecked;
const getRoleManagement = (state) => state.role_management.valueChecked;
const getRoleName = (state) => state.role_name.inputValue;
const getRoleNameIsError = (state) => state.role_name.isError;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getStateNamespace = (state) => state.state_name.namespace;

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
    [ getFunctionalAreaSelectItem, getFunctionalAreaNamespace, getRoleName, getRoleNameIsError,
    getRoleDescription, getRoleDescriptionIsError, getRoleLeadership, getRoleManagement],
    (functionalAreaSelectItem, functionalAreaNamespace, roleName, roleNameIsError,
     roleDescription, roleDescriptionIsError, roleLeadership, roleManagement) => {
        return ({
            functionalAreaSelectItem,
            functionalAreaNamespace,
            roleName,
            roleNameIsError,
            roleDescription,
            roleDescriptionIsError,
            roleLeadership,
            roleManagement
        });
    }
);
