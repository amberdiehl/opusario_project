import { FETCH_ITEMS, ADD_ITEM, CHANGE_SELECTED_ITEM, SET_LOADING, SHOW_ERROR } from "../constants";

const defaultFunctionalArea = {id: 0, name: "- Select functional area -"};

const initialState = {
    namespace: '',
    componentId: 'FunctionalArea',
    items: [
        defaultFunctionalArea,
    ],
    selectItem: '0',
    allowAdd: true,
    validationRegEx: /^[a-zA-Z ]*$/,
    regExDescription: 'letters and spaces.',
    errorMessage: '',
    isError: false,
    isLoading: false,
    apiRoute: '/api/functional-areas/',
};


export default function functional_area(state=initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            action.items.unshift(defaultFunctionalArea);
            return {...state, "items": action.items};
        case ADD_ITEM:
            return {...state, "selectItem": action.itemValue};
        case CHANGE_SELECTED_ITEM:
            return {...state, "selectItem": action.newValue};
        case SHOW_ERROR:
            return {...state,
                "isError": action.trueFalse,
                "errorMessage": action.message};
        case SET_LOADING:
            return {...state, "isLoading": action.value};
        default:
            return state;
    }
}
