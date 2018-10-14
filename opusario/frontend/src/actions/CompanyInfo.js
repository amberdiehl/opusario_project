import { csrfHeader } from "../helpers";
import {setLoading, showError} from './generic';
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

export const addItem = (namespace, apiRoute, companyName, city, state, country) => {
    return (dispatch) => {

        const body = JSON.stringify({
            "name": companyName,
            city,
            state,
            country
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
                        console.log(json);
                        dispatch(showError(namespace, true, json.non_field_errors));
                    }
                } else {
                    dispatch({
                        type: `${namespace}/${SET_VALUE}`,
                        itemValue: json.id.toString()
                    });
                    dispatch(showError(namespace, false, []));
                }
            })
            .catch( () => {
                dispatch(showError(namespace, true, [server500ErrorMessage]));
            });
    };
};

export const changeItem = (namespace, apiRoute, companyName, city, state, country) => {
    return (dispatch) => {

        const body = JSON.stringify({
            "name": companyName,
            city,
            state,
            country
        });

        return fetch(apiRoute, {headers: csrfHeader, method: "PUT", body, })
            .then( response =>
                response.json().then(json => ({
                status: response.status,
                json
                })
            ))
            .then( ({status, json}) => {
                if (status >= 400) {
                    if (status === 400) {
                        dispatch(showError(namespace, true, json.non_field_errors));
                    }
                } else {
                    dispatch(showError(namespace, false, []));
                }
            })
            .catch( () => {
                dispatch(showError(namespace, true, [server500ErrorMessage]));
            });
    };
};
