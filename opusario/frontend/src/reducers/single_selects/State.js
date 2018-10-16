import { base_reducer_single_select, base_reducer_single_select_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: '- Select state -'};

const initialState = {
    ...base_reducer_single_select_state,
    namespace: getNamespace(),
    componentId: 'State',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    hasForeignKey: true,
    foreignKeyModel: 'country',
    apiRoute: '/api/states',
};

export default function state_name(state=initialState, action) {
    return base_reducer_single_select(state, action);
}
