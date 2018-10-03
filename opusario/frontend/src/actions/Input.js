import { SET_VALUE, SHOW_ERROR } from "../constants";


export const showError = (namespace, trueFalse, message) => {
    return {
        type: `${namespace}/${SHOW_ERROR}`,
        trueFalse,
        message
    };
};

export const setTextValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_VALUE}`,
        newValue
    };
};
