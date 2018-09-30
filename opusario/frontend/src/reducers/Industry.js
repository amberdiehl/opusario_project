import { FETCH_ITEMS, ADD_ITEM, CHANGE_SELECTED_ITEM, SET_LOADING, SHOW_ERROR } from "../constants";
import getNamespace from "../helpers";

const defaultValue = {id: 0, name: "- Select industry -"};

const initialState = {
    namespace: getNamespace(),
    componentId: 'Industry',
    items: [
        defaultValue,
    ],
    selectItem: '0',
    allowAdd: true,
    validationRegEx: /^[a-zA-Z ]*$/,
    regExDescription: 'letters and spaces.',
    errorMessage: '',
    isError: false,
    isLoading: false,
    apiRoute: '/api/industries/',
};


export default function industry(state=initialState, action) {
    switch (action.type) {
        case `${state.namespace}/${FETCH_ITEMS}`:
            action.items.unshift(defaultValue);
            return {...state, "items": action.items};
        case `${state.namespace}/${ADD_ITEM}`:
            return {...state, "selectItem": action.itemValue};
        case `${state.namespace}/${CHANGE_SELECTED_ITEM}`:
            return {...state, "selectItem": action.newValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessage": action.message};
        case `${state.namespace}/${SET_LOADING}`:
            return {...state, "isLoading": action.value};
        default:
            return state;
    }
}
