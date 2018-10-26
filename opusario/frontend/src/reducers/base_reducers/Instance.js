import {FETCH_ITEM, FLASH_SUCCESS, SET_INSTANCE_ID, SET_ITEM_VALUE, SHOW_ERROR} from "../../constants";

/*
Defines STATE for the model instance components and initial defaults. Any key with a value of 'DEFINE'
must be initialized in the model reducer. Remaining items can also be modified or left as initialized here.
*/
export const base_reducer_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    instanceId: 0,
    instanceItem: {
        // DEFINE default values for each model field that will be handled using an InputComponent, e.g.:
        // name: '',
        // version: '',
        inputErrors: {}
    },
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
                "instanceItem": action.item
            };
        case `${state.namespace}/${SET_ITEM_VALUE}`:
            if (action.itemKey === 'inputErrors') {
                return {
                    ...state,
                    instanceItem: {
                        ...state.instanceItem,
                        inputErrors: {
                            ...state.instanceItem.inputErrors,
                            ...action.newValue
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    instanceItem: {
                        ...state.instanceItem,
                        [action.itemKey]: action.newValue
                    }
                }
            }
        case `${state.namespace}/${SET_INSTANCE_ID}`:
            return {...state,
                "instanceId": action.itemValue
            };
        case `${state.namespace}/${FLASH_SUCCESS}`:
            return {...state,
                "flashSuccess": action.trueFalse
            };
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message
            };
        default:
            return state;
    }
}
