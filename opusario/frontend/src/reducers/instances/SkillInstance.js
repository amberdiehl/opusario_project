import { base_reducer, base_reducer_state } from "../base_reducers/Instance";
import { getNamespace } from '../../helpers';


export const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'Skill',
    instanceItem: {
        name: '',
        version: '',
        inputErrors: {}
    },
    modalReset: {
        instanceId: 0,
        instanceItem: {
            name: '',
            version: '',
            inputErrors: {}
        }
    },
    apiRoute: '/api/skills',
};

export default function skill_instance(state=initialState, action) {
    return base_reducer(state, action);
}
