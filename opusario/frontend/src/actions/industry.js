import { getCookie } from "../helpers";

const ADD_ITEM = 'ADD_ITEM';
const FETCH_ITEMS = 'FETCH_ITEMS';
const SET_LOADING = 'SET_LOADING';

const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie('csrftoken')
};


export const setLoading = (bool) => {
    return {
        type: SET_LOADING,
        value: bool
    };
};

export const fetchItems = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return fetch(`/api/industries/`, {headers,})
            .then(response => response.json())
            .then(items => {
                dispatch(setLoading(false));
                return dispatch({
                    type: FETCH_ITEMS,
                    items
                });
            });
    };
};

export const addItem = (text) => {
    return (dispatch) => {
        const body = JSON.stringify({
            "name": text
        });
        return fetch("/api/industries/", {headers, method: "POST", body, })
            .then(response => response.json())
            .then(item => {
                return dispatch({
                    type: ADD_ITEM,
                    item
                });
            });
    };
};
