import { getNamespace } from '../helpers';

export const initialState = {
    namespace: getNamespace(),
    componentId: 'CompanyInformation',
    childState: {},
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
