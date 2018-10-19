import { base_reducer_input, base_reducer_input_state } from '../base_reducers/Input';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_input_state,
    namespace: getNamespace(),
    componentId: 'RoleName',
    inputSize: 300,
};

export default function role_name(state=initialState, action) {
    return base_reducer_input(state, action);
}
