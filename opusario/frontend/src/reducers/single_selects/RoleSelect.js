import { base_reducer_single_select, base_reducer_single_select_state } from '../base_reducers/SingleSelect';
import { getNamespace } from '../../helpers';

const defaultValue = {id: 0, name: "- Select role -"};

const initialState = {
    ...base_reducer_single_select_state,
    namespace: getNamespace(),
    componentId: 'SelectRole',
    items: [
        defaultValue,
    ],
    defaultValue: defaultValue,
    addMethod: 'modal',
    hasForeignKey: true,
    foreignKeyModel: 'at_functional_area',
    foreignKeyValue: '0',
    apiRoute: '/api/roles',
};

export default function role_select(state=initialState, action) {
    return base_reducer_single_select(state, action);
}
