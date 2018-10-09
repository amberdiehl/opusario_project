import { csrfHeader } from "../helpers";
import {setLoading, showError} from './generic';
import {FETCH_ITEM, CHANGE_ITEM, server500ErrorMessage} from "../constants";


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
                dispatch(showError(namespace, true, server500ErrorMessage));
            });
    };
};

export const changeItem = (namespace, apiRoute, text) => {
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
                        type: `${namespace}/${CHANGE_ITEM}`,
                        itemValue: json.id.toString()
                    });
                    dispatch(showError(namespace, false, ''));
                    dispatch(fetchItem(namespace, apiRoute));
                }
            })
            .catch( () => {
                dispatch(showError(namespace, true, server500ErrorMessage));
            });
    };
};
