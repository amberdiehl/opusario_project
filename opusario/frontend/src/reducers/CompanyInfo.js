import { getNamespace } from '../helpers';
import {FLASH_SUCCESS, SET_VALUE, SHOW_ERROR} from "../constants";

export const initialState = {
    namespace: getNamespace(),
    componentId: 'CompanyInformation',
    companyId: '',
    childState: {},
    errorMessages: [],
    isError: false,
    isLoading: false,
    flashSuccess: false,
    apiRoute: '/api/companies',
};

export default function company_info(state=initialState, action) {
    switch (action.type) {
        case `${state.namespace}/${SET_VALUE}`:
            return {...state,
                "companyId": action.itemValue};
        case `${state.namespace}/${FLASH_SUCCESS}`:
            return {...state,
                "flashSuccess": action.trueFalse};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message};
        default:
            return state;
    }
}
