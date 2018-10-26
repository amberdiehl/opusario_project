import { SET_VALUE } from '../constants';


export const setCheckedValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_VALUE}`,
        newValue
    };
};
