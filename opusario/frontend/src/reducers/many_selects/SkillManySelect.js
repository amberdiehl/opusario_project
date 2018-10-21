import { base_reducer, base_reducer_state } from '../base_reducers/ManySelect';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'SelectSkills',
    m2mModel: 'Role',
    apiRoute: '/api/skills',
};

export default function skill_select(state=initialState, action) {
    return base_reducer(state, action);
}
