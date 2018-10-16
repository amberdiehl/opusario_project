import { csrfHeader, getFlattenedErrors } from '../helpers';
import {setLoading, showError} from './generic';
import {FETCH_ITEMS, ADD_ITEM, SET_VALUE, SET_FOREIGN_KEY_VALUE, server500ErrorMessage} from '../constants';


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

export const addItem = (namespace, apiRoute, text, model, fk) => {
    return (dispatch) => {

        const body = JSON.stringify({
            "name": text,
            [model]: fk
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
                        dispatch(showError(namespace, true, getFlattenedErrors(json)));
                    }
                } else {
                    dispatch({
                        type: `${namespace}/${ADD_ITEM}`,
                        itemValue: json.id.toString()
                    });
                    dispatch(showError(namespace, false, []));
                    dispatch(fetchItems(namespace, apiRoute));
                }
            })
            .catch( () => {
                dispatch(showError(namespace, true, [server500ErrorMessage]));
            });
    };
};

export const setSelectValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_VALUE}`,
        newValue
    };
};

export const setForeignKeyValue = (namespace, newValue) => {
    return {
        type: `${namespace}/${SET_FOREIGN_KEY_VALUE}`,
        newValue
    };
};
