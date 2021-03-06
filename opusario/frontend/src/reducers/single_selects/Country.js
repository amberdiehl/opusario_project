import { base_reducer, base_reducer_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select country -"};

const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'Country',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    apiRoute: '/api/countries',
};

export default function country(state=initialState, action) {
    return base_reducer(state, action);
}
