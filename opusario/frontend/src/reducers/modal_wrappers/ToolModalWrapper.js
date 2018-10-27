import { base_reducer, base_reducer_state } from '../base_reducers/ModalWrapper';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'tools',
};

export default function tool_modal(state=initialState, action) {
    return base_reducer(state, action);
}
