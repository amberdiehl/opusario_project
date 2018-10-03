import { SET_VALUE, SHOW_ERROR } from '../constants';
import { getNamespace } from '../helpers';


const initialState = {
    namespace: getNamespace(),
    componentId: 'RoleDescription',
    placeholder: 'Describe what this role does within the organization.',
    textValue: '',
    validationRegEx: /^[a-zA-Z0-9 ]*$/,
    regExDescription: 'letters, numbers and spaces.',
    errorMessage: '',
    isError: false,
};


export default function role_description(state=initialState, action) {

    switch (action.type) {

        case `${state.namespace}/${SET_VALUE}`:
            return {...state, "textValue": action.newValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessage": action.message};

        default:
            return state;
    }
}
