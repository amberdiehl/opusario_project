import { base_reducer_input, base_reducer_input_state } from '../base_reducers/Input';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_input_state,
    namespace: getNamespace(),
    componentId: 'CompanySize',
    inputType: 'text',
    validationRegEx: /[0-9]+$/,
    regExDescription: 'a whole number.'
};

export default function company_size(state=initialState, action) {
    return base_reducer_input(state, action);
}
