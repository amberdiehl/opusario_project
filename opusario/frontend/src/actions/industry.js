import { getCookie } from "../helpers";

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ADD_INDUSTRY = 'ADD_INDUSTRY';
export const CHANGE_SELECTED_ITEM = 'CHANGE_SELECTED_ITEM';
export const SET_LOADING = 'SET_LOADING';
export const SHOW_ERROR = 'SHOW_ERROR';

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
                    type: ADD_INDUSTRY,
                    itemValue: item.id.toString()
                });
            })
            .then( () => {
                dispatch(fetchItems());
            });
    };
};

export const setSelectValue = (newValue) => {
    return {
        type: CHANGE_SELECTED_ITEM,
        newValue
    };
};

export const showError = (bool) => {
    return {
        type: SHOW_ERROR,
        value: bool
    };
};
