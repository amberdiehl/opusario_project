import { FETCH_ITEMS, ADD_ITEM, CHANGE_SELECTED_ITEM, SET_LOADING, SHOW_ERROR } from '../actions/DynamicSelectList';

const defaultValue = {id: 0, name: "- Select industry -"};

const initialState = {
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
        case FETCH_ITEMS:
            action.items.unshift(defaultValue);
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
