import { createSelector } from 'reselect';

// selectors
const getCitySelectItem = (state) => state.city.selectItem;
const getCityNamespace = (state) => state.city.namespace;
const getCountrySelectItem = (state) => state.country.selectItem;
const getCountryNamespace = (state) => state.country.namespace;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getStateNamespace = (state) => state.state_name.namespace;

// reselect function
export const getCompanySelectItemsState = createSelector(
  [ getCitySelectItem, getCityNamespace,
      getStateSelectItem, getStateNamespace,
      getCountrySelectItem, getCountryNamespace],
  (city, cityNamespace, state, stateNamespace, country, countryNamespace) => {
      return ({
          citySelectItem: city,
          cityNamespace,
          stateSelectItem: state,
          stateNamespace,
          countrySelectItem: country,
          countryNamespace
      });
  }
);
