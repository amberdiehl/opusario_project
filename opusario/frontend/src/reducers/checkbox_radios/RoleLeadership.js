import { base_reducer, base_reducer_state } from '../base_reducers/CheckBoxRadio';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'ExecutiveLeadership',
    items: [
        {"label": "Has executive leadership?", "value": "yes"},
    ],
 };

export default function role_leadership(state=initialState, action) {
    return base_reducer(state, action);
}
