import { base_reducer_input, base_reducer_input_state } from '../base_reducers/Input';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_input_state,
    namespace: getNamespace(),
    componentId: 'CompanyWebsite',
    inputType: 'text',
    validationRegEx: /^((https?):\/\/)(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
    regExDescription: 'a valid URL format such as https://www.opusario.com.'
};

export default function company_website(state=initialState, action) {
    return base_reducer_input(state, action);
}
