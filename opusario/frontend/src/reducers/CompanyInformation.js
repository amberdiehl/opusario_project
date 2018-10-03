import { getNamespace } from '../helpers';

export const initialState = {
    namespace: getNamespace(),
    componentId: 'CompanyInformation',
    validationRegEx: /^[a-zA-Z ]*$/,
    regExDescription: 'letters and spaces.',
    errorMessage: '',
    isError: false,
    isLoading: false,
    apiRoute: '/api/companies/',
};

export function company_information(state=initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
