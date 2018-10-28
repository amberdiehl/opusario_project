import { SHOW_MODAL } from '../constants';


export const setShowModal = (namespace, newValue) => {
    return {
        type: `${namespace}/${SHOW_MODAL}`,
        newValue
    };
};
