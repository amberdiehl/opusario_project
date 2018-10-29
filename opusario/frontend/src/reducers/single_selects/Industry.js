import { base_reducer, base_reducer_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select industry -"};

const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'Industry',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    apiRoute: '/api/industries',
};

export default function industry(state=initialState, action) {
    return base_reducer(state, action);
}
