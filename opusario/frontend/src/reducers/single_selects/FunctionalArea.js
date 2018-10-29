import { base_reducer, base_reducer_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select functional area -"};

const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'FunctionalArea',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    apiRoute: '/api/functional-areas',
};

export default function functional_area(state=initialState, action) {
    return base_reducer(state, action);
}
