import { base_reducer, base_reducer_state } from '../base_reducers/CheckBoxRadio';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'ManagesPeople',
    items: [
        {"label": "Has oversight of fellow team members.", "value": "yes"},
    ],
 };

export default function role_management(state=initialState, action) {
    return base_reducer(state, action);
}
