import { base_reducer, base_reducer_state } from "../base_reducers/Instance";
import { getNamespace } from '../../helpers';


export const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'CompanyInformation',
    apiRoute: '/api/companies',
};

export default function company_instance(state=initialState, action) {
    return base_reducer(state, action);
}
