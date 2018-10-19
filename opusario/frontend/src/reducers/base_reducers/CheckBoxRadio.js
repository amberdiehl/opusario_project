import { SET_VALUE, SHOW_ERROR } from "../../constants";

// Defines STATE for the component and initial defaults. Any key with a value of 'DEFINE' must be INITIALIZED
// in the model based reducer. Remaining items can also be modified or left as initialized here.
export const base_reducer_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    inputType: 'checkbox',  // checkbox or radio
    items: [  // If checkbox, should have only one element. If radio, at least two.
        {"label": "DEFINE", "value": "DEFINE"},
    ],
    valueChecked: '',
    errorMessages: [],
    isError: false,
    isDisabled: false,
};

// Processes state changes from actions for the Input component.
export function base_reducer(state, action) {
    switch (action.type) {
        case `${state.namespace}/${SET_VALUE}`:
            return {...state, "valueChecked": action.newValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message};
        default:
            return state;
    }
}
