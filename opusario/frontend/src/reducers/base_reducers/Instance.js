import {FETCH_ITEM, FLASH_SUCCESS, SET_VALUE, SHOW_ERROR} from "../../constants";

/*
Defines STATE for the model instance components and initial defaults. Any key with a value of 'DEFINE'
must be initialized in the model reducer. Remaining items can also be modified or left as initialized here.
*/
export const base_reducer_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    instanceId: 0,
    instanceItem: {},
    childState: {},
    errorMessages: [],
    isError: false,
    isLoading: false,
    flashSuccess: false,
    apiRoute: 'DEFINE',
};

export function base_reducer(state, action) {
    switch (action.type) {
        case `${state.namespace}/${FETCH_ITEM}`:
            return {...state,
                "instanceItem": action.item};
        case `${state.namespace}/${SET_VALUE}`:
            return {...state,
                "instanceId": parseInt(action.itemValue, 10)};
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
