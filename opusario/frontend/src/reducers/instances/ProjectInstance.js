import { base_reducer, base_reducer_state } from "../base_reducers/Instance";
import { getNamespace } from '../../helpers';


export const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'Project',
    instanceItem: {
        company: 0,
        name: '',
        project_objective: '',
        start_year: '',
        duration: '',
        team_size: '',
        code_repository: '',
        project_site: '',
        inputErrors: {}
    },
    apiRoute: '/api/projects',
};

export default function project_instance(state=initialState, action) {
    return base_reducer(state, action);
}
