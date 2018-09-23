const FETCH_ITEMS = 'FETCH_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

export const fetchItems = () => {
    return (dispatch, getState) => {
        const headers = {"Content-Type": "application/json"};
        return fetch("/api/industries/", {headers,})
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error))
            .then(items => {
                return dispatch({
                    type: FETCH_ITEMS,
                    items
                });
            });
    };
};

export const addItem = (text) => {
    return (dispatch, getState) => {
        const headers = {"Content-Type": "application/json"};
        const body = JSON.stringify({text, });
        return fetch("/api/industries/", {headers, method: "POST", body})
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error))
            .then(items => {
                return dispatch({
                    type: FETCH_ITEMS,
                    items
                });
            });
    };
};
