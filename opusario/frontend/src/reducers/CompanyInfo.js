import { getNamespace } from '../helpers';
import {getCitySelectedItem} from "./City";

export const initialState = {
    namespace: getNamespace(),
    componentId: 'CompanyInformation',
    citySelectItem: '0',
    validationRegEx: /^[a-zA-Z0-9 ]*$/,
    regExDescription: 'letters, numbers and spaces.',
    errorMessage: '',
    isError: false,
    isLoading: false,
    apiRoute: '/api/companies/',
};

export default function company_info(state=initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
