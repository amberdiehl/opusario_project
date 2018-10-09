import { SET_VALUE, SHOW_ERROR } from "../../constants";

// Defines STATE for the Input component and initial defaults. Any key with a value of 'DEFINE' must be INITIALIZED
// in the model based reducer. Remaining items can also be modified or left as initialized here.
export const base_reducer_input_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    inputType: 'text',
    inputSize: 250,
    inputValue: '',
    validationRegEx: /^[a-zA-Z0-9 ]*$/,
    regExDescription: 'letters, numbers and spaces.',
    errorMessage: '',
    isError: false,
    isDisabled: false,
};

// Processes state changes from actions for the Input component.
export function base_reducer_input(state, action) {
    switch (action.type) {
        case `${state.namespace}/${SET_VALUE}`:
            return {...state, "inputValue": action.newValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessage": action.message};
        default:
            return state;
    }
}
