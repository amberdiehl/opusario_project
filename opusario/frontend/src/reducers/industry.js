const FETCH_ITEMS = 'FETCH_ITEMS';
const defaultValue = {id: 0, name: "- Select industry -"};

const initialState = {
    componentId: "Industry",
    items: [
        defaultValue,
    ],
    newItem: '',
    route: "industries"
};

export default function industry(state=initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            action.items.unshift(defaultValue);
            return {...state, "items": action.items};
        default:
            return state;
    }
}
