import { FETCH_ITEMS, ADD_ITEM, SET_VALUE, SHOW_LOADING, SHOW_ERROR } from "../../constants";

// Defines STATE for the SingleSelect component and initial defaults. Any key with a value of 'DEFINE'
// must be INITIALIZED in the model reducer. Remaining items can also be modified or left as initialized here.
export const base_reducer_single_select_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    items: ['DEFINE',],
    defaultValue: 'DEFINE',
    selectItem: '0',
    allowAdd: true,
    validationRegEx: /^[a-zA-Z ]*$/,
    regExDescription: 'letters and spaces.',
    hasForeignKey: false,
    foreignKeyValue: 0,
    errorMessages: [],
    isError: false,
    isLoading: false,
    apiRoute: 'DEFINE',
};

// Processes state changes from actions for the Simple Select component.
export function base_reducer_single_select(state, action) {
    switch (action.type) {
        case `${state.namespace}/${FETCH_ITEMS}`:
            action.items.unshift(state.defaultValue);
            return {...state, "items": action.items};
        case `${state.namespace}/${ADD_ITEM}`:
            return {...state, "selectItem": action.itemValue};
        case `${state.namespace}/${SET_VALUE}`:
            return {...state, "selectItem": action.newValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message};
        case `${state.namespace}/${SHOW_LOADING}`:
            return {...state, "isLoading": action.value};
        default:
            return state;
    }
}
