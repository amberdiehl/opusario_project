import { base_reducer_input, base_reducer_input_state } from '../base_reducers/Input';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_input_state,
    namespace: getNamespace(),
    componentId: 'RoleDescription',
    inputType: 'textarea',
    validationRegEx: /^[a-zA-Z0-9., ]*$/,
    regExDescription: 'letters, numbers, periods, commas and spaces.',
};

export default function role_description(state=initialState, action) {
    return base_reducer_input(state, action);
}
