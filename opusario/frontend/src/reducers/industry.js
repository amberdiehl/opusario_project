import { FETCH_ITEMS, ADD_INDUSTRY, CHANGE_SELECTED_ITEM, SET_LOADING, SHOW_ERROR } from '../actions/industry';

const defaultValue = {id: 0, name: "- Select industry -"};

const initialState = {
    componentId: 'Industry',
    items: [
        defaultValue,
    ],
    selectItem: '0',
    allowAdd: true,
    validationRegEx: /^[a-zA-Z]*$/,
    errorMessage: '',
    isError: false,
    isLoading: false
};


export default function industry(state=initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            action.items.unshift(defaultValue);
            return {...state, "items": action.items};
        case SET_LOADING:
            return {...state, "isLoading": action.value};
        case ADD_INDUSTRY:
            return {...state, "selectItem": action.itemValue};
        case CHANGE_SELECTED_ITEM:
            return {...state, "selectItem": action.newValue};
        default:
            return state;
    }
}
