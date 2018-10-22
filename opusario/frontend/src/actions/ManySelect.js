import { csrfHeader } from '../helpers';
import { setLoading, showError } from './generic';
import {FETCH_ITEMS, SET_FILTER, ADD_ITEM, REMOVE_ITEM, server500ErrorMessage} from '../constants';


export const fetchItems = (namespace, apiRoute) => {
    return (dispatch) => {

        dispatch(setLoading(namespace, true));

        return fetch(apiRoute, {headers: csrfHeader,})
            .then(response => response.json())
            .then(items => {
                return dispatch({
                    type: `${namespace}/${FETCH_ITEMS}`,
                    items
                });
            })
            .then( () => {
                dispatch(setLoading(namespace, false));
            })
            .catch( () => {
                dispatch(showError(namespace, true, [server500ErrorMessage]));
            });
    };
};

export const setFilter = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_FILTER}`,
        newValue
    };
};

export const addSelectItem = (namespace, itemValue) => {
    return {
        type: `${namespace}/${ADD_ITEM}`,
        itemValue
    };
};

export const removeSelectItem = (namespace, itemValue) => {
    return {
        type: `${namespace}/${REMOVE_ITEM}`,
        itemValue
    };
};
