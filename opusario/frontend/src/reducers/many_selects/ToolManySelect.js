import { base_reducer, base_reducer_state } from '../base_reducers/ManySelect';
import { getNamespace } from '../../helpers';


const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'SelectTools',
    items: [
        {
            id: 0,
            name: "name value here",
            version: "version value here",
            roles: []
        }
    ],
    m2mModelField: 'roles',
    apiRoute: '/api/tools',
};

export default function tool_select(state=initialState, action) {
    return base_reducer(state, action);
}
