import { createSelector } from 'reselect';

// selectors
const getCitySelectItem = (state) => state.city.selectItem;
const getCityNamespace = (state) => state.city.namespace;
const getCompanyName = (state) => state.company_name.inputValue;
const getCompanyNameIsError = (state) => state.company_name.isError;
const getCompanyWebsite = (state) => state.company_website.inputValue;
const getCompanyWebsiteIsError = (state) => state.company_website.isError;
const getCountrySelectItem = (state) => state.country.selectItem;
const getCountryNamespace = (state) => state.country.namespace;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getStateNamespace = (state) => state.state_name.namespace;

// reselect function
export const getCompanyChildState = createSelector(
  [ getCitySelectItem, getCityNamespace,
      getStateSelectItem, getStateNamespace,
      getCountrySelectItem, getCountryNamespace,
      getCompanyName, getCompanyNameIsError,
      getCompanyWebsite, getCompanyWebsiteIsError
  ],
  (city, cityNamespace, state, stateNamespace, country, countryNamespace, companyName, companyNameIsError,
   companyWebsite, companyWebsiteIsError) => {
      return ({
          citySelectItem: city,
          cityNamespace,
          stateSelectItem: state,
          stateNamespace,
          countrySelectItem: country,
          countryNamespace,
          companyName,
          companyNameIsError,
          companyWebsite,
          companyWebsiteIsError
      });
  }
);
