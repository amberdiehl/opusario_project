import { base_reducer_single_select, base_reducer_single_select_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select functional area -"};

const initialState = {
    ...base_reducer_single_select_state,
    namespace: getNamespace(),
    componentId: 'FunctionalArea',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    apiRoute: '/api/functional-areas',
};

export default function functional_area(state=initialState, action) {
    return base_reducer_single_select(state, action);
}
