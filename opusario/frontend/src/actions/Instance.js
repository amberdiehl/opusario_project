import { csrfHeader, getFlattenedErrors } from "../helpers";
import {setFlashSuccess, setLoading, showError} from './generic';
import {FETCH_ITEM, SET_VALUE, server500ErrorMessage} from "../constants";


export const fetchItem = (namespace, apiRoute) => {
    return (dispatch) => {

        dispatch(setLoading(namespace, true));

        return fetch(apiRoute, {headers: csrfHeader,})
            .then(response => response.json())
            .then(item => {
                return dispatch({
                    type: `${namespace}/${FETCH_ITEM}`,
                    item
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

export const addOrUpdateItem = (namespace, apiRoute, method, data) => {
    return (dispatch) => {

        const body = JSON.stringify(data);

        return fetch(apiRoute, {headers: csrfHeader, method, body, })
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
                    if (method === 'POST') {
                        dispatch({
                            type: `${namespace}/${SET_VALUE}`,
                            itemValue: json.id.toString()
                        });
                    }
                    dispatch(showError(namespace, false, []));
                    dispatch(setFlashSuccess(namespace, true));
                    setTimeout(() => {
                        dispatch(setFlashSuccess(namespace, false));}, 3000);
                }
            })
            .catch( () => {
                dispatch(showError(namespace, true, [server500ErrorMessage]));
            });
    };
};
