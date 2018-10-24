import { base_reducer, base_reducer_state } from "../base_reducers/Instance";
import { getNamespace } from '../../helpers';


export const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'Role',
    apiRoute: '/api/roles',
};

export default function role_instance(state=initialState, action) {
    return base_reducer(state, action);
}
