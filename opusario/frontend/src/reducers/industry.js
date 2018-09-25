const ADD_ITEM = 'ADD_ITEM';
const FETCH_ITEMS = 'FETCH_ITEMS';
const SET_LOADING = 'SET_LOADING';

const defaultValue = {id: 0, name: "- Select industry -"};


const initialState = {
    componentId: "Industry",
    items: [
        defaultValue,
    ],
    selectedItem: "0",
    isLoading: false
};


export default function industry(state=initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            console.log(action.item);
            return {
                ...state,
                "selectedItem": action.item.id.toString()
            };
        case FETCH_ITEMS:
            action.items.unshift(defaultValue);
            return {...state, "items": action.items};
        case SET_LOADING:
            return {...state, "isLoading": action.value};
        default:
            return state;
    }
}
