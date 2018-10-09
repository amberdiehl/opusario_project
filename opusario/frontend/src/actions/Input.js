import {SET_VALUE} from '../constants';


export const setInputValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_VALUE}`,
        newValue
    };
};
