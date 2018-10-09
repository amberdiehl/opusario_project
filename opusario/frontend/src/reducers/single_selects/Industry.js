import { base_reducer_single_select, base_reducer_single_select_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select industry -"};

const initialState = {
    ...base_reducer_single_select_state,
    namespace: getNamespace(),
    componentId: 'Industry',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    apiRoute: '/api/industries/',
};

export default function industry(state=initialState, action) {
    return base_reducer_single_select(state, action);
}
