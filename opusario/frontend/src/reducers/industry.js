const ADD_INDUSTRY = 'ADD_INDUSTRY';
const FETCH_ITEMS = 'FETCH_ITEMS';
const SET_LOADING = 'SET_LOADING';

const defaultValue = {id: 0, name: "- Select industry -"};


const initialState = {
    allowAdd: true,
    componentId: 'Industry',
    items: [
        defaultValue,
    ],
    selectItem: '0',
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
            return {...state, "selectItem": action.item};
        default:
            return state;
    }
}
