import { base_reducer_input, base_reducer_input_state } from '../base_reducers/Input';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_input_state,
    namespace: getNamespace(),
    componentId: 'Version',
};

export default function skill_version(state=initialState, action) {
    return base_reducer_input(state, action);
}
