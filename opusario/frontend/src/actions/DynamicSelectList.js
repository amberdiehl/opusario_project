import { getCookie } from "../helpers";

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const CHANGE_SELECTED_ITEM = 'CHANGE_SELECTED_ITEM';
export const SET_LOADING = 'SET_LOADING';
export const SHOW_ERROR = 'SHOW_ERROR';

const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie('csrftoken')
};
const server500ErrorMessage = 'Oops! An error occurred on the server. Please try again later.';


export const setLoading = (bool) => {
    return {
        type: SET_LOADING,
        value: bool
    };
};

export const showError = (trueFalse, message) => {
    return {
        type: SHOW_ERROR,
        trueFalse,
        message
    };
};

export const fetchItems = (apiRoute) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return fetch(apiRoute, {headers,})
            .then(response => response.json())
            .then(items => {
                return dispatch({
                    type: FETCH_ITEMS,
                    items
                });
            })
            .then( () => {
                dispatch(setLoading(false));
            })
            .catch( () => {
                dispatch(showError(true, server500ErrorMessage));
            });
    };
};

export const addItem = (apiRoute, text) => {
    return (dispatch) => {
        const body = JSON.stringify({
            "name": text
        });
        return fetch(apiRoute, {headers, method: "POST", body, })
            .then( response =>
                response.json().then(json => ({
                status: response.status,
                json
                })
            ))
            .then( ({status, json}) => {
                if (status >= 400) {
                    if (status === 400) {
                        dispatch(showError(true, json.name[0]));
                    }
                } else {
                    dispatch({
                        type: ADD_ITEM,
                        itemValue: json.id.toString()
                    });
                    dispatch(showError(false, ''));
                    dispatch(fetchItems(apiRoute));
                }
            })
            .catch( () => {
                dispatch(showError(true, server500ErrorMessage));
            });
    };
};

export const setSelectValue = (newValue) => {
    return {
        type: CHANGE_SELECTED_ITEM,
        newValue
    };
};
