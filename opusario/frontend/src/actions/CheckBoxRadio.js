import { SET_VALUE } from '../constants';


export const setSelectValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_VALUE}`,
        newValue
    };
};
