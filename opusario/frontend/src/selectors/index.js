import { createSelector } from 'reselect';

// selectors
const getCitySelectItem = (state) => state.city.selectItem;
const getStateSelectItem = (state) => state.state_name.selectItem;
const getCountrySelectItem = (state) => state.country.selectItem;

// reselect function
export const getCompanySelectItemsState = createSelector(
  [ getCitySelectItem, getStateSelectItem, getCountrySelectItem ],
  (city, state, country) => {
      console.log(city, state, country);
      return ({
          citySelectItem: city,
          stateSelectItem: state,
          countrySelectItem: country
      });
  }
);
