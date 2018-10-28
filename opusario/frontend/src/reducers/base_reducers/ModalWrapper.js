import { SHOW_MODAL } from "../../constants";

// Defines STATE for the component and initial defaults. Any key with a value of 'DEFINE' must be INITIALIZED
// in the model based reducer. Remaining items can also be modified or left as initialized here.
export const base_reducer_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    showModal: false
};

// Processes state changes from actions for the component.
export function base_reducer(state, action) {
    switch (action.type) {
        case `${state.namespace}/${SHOW_MODAL}`:
            return {...state, "showModal": action.newValue};
        default:
            return state;
    }
}
