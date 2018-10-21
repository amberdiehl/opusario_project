import { FETCH_ITEMS, SHOW_LOADING, SHOW_ERROR } from "../../constants";

/*
Defines STATE for the ManySelect component and initial defaults. Any key with a value of 'DEFINE'
must be initialized in the model reducer. Remaining items can also be modified or left as initialized here.
*/
export const base_reducer_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    items: ['placeholder', ],
    m2mModel: 'DEFINE',
    pageSize: 20,
    currentPage: 1,
    filter: '',
    errorMessages: [],
    isError: false,
    isLoading: false,
    apiRoute: 'DEFINE',
};

// Processes state changes from actions for the Many Select component.
export function base_reducer(state, action) {
    switch (action.type) {
        case `${state.namespace}/${FETCH_ITEMS}`:
            return {...state,
                "items": action.items};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message};
        case `${state.namespace}/${SHOW_LOADING}`:
            return {...state,
                "isLoading": action.value};
        default:
            return state;
    }
}
