import { csrfHeader } from "../helpers";
import {FETCH_ITEMS, ADD_ITEM, SET_VALUE, SHOW_LOADING, SHOW_ERROR,
    server500ErrorMessage} from "../constants";


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
                dispatch(showError(namespace, true, server500ErrorMessage));
            });
    };
};

export const addItem = (namespace, apiRoute, text) => {
    return (dispatch) => {

        const body = JSON.stringify({
            "name": text
        });

        return fetch(apiRoute, {headers: csrfHeader, method: "POST", body, })
            .then( response =>
                response.json().then(json => ({
                status: response.status,
                json
                })
            ))
            .then( ({status, json}) => {
                if (status >= 400) {
                    if (status === 400) {
                        dispatch(showError(namespace, true, json.name[0]));
                    }
                } else {
                    dispatch({
                        type: `${namespace}/${ADD_ITEM}`,
                        itemValue: json.id.toString()
                    });
                    dispatch(showError(namespace, false, ''));
                    dispatch(fetchItems(namespace, apiRoute));
                }
            })
            .catch( () => {
                dispatch(showError(namespace, true, server500ErrorMessage));
            });
    };
};

export const setSelectValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_VALUE}`,
        newValue
    };
};
