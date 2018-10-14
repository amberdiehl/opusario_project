import {FLASH_SUCCESS, SHOW_LOADING, SHOW_ERROR} from "../constants";

export const setFlashSuccess = (namespace, trueFalse) => {
    return {
        type: `${namespace}/${FLASH_SUCCESS}`,
        trueFalse
    };
};

export const setLoading = (namespace, bool) => {
    return {
        type: `${namespace}/${SHOW_LOADING}`,
        value: bool
    };
};

export const showError = (namespace, trueFalse, message) => {
    return {
        type: `${namespace}/${SHOW_ERROR}`,
        trueFalse,
        message
    };
};
