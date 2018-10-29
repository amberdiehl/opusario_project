import { base_reducer, base_reducer_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select city -"};

const initialState = {
    ...base_reducer_state,
    namespace: getNamespace(),
    componentId: 'City',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    hasForeignKey: true,
    foreignKeyModel: 'state',
    apiRoute: '/api/cities',
};

export default function city_select(state=initialState, action) {
    return base_reducer(state, action);
}
