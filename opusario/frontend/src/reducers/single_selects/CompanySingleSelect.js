import { base_reducer, base_reducer_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select company -"};

const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'Company',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    allowAdd: false,  // Company is too complex to add via Single Select
    hasCompositeName: true,
    apiRoute: '/api/companies',
};

export default function company_select(state=initialState, action) {
    return base_reducer(state, action);
}
