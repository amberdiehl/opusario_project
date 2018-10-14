import { getNamespace } from '../helpers';
import {SET_VALUE, SHOW_ERROR} from "../constants";

export const initialState = {
    namespace: getNamespace(),
    componentId: 'CompanyInformation',
    companyId: '',
    childState: {},
    errorMessages: [],
    isError: false,
    isLoading: false,
    apiRoute: '/api/companies/',
};

export default function company_info(state=initialState, action) {
    switch (action.type) {
        case `${state.namespace}/${SET_VALUE}`:
            return {...state,
                "companyId": action.itemValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message};
        default:
            return state;
    }
}
