import { csrfHeader } from '../helpers';
import { setLoading, showError } from './generic';
import { FETCH_ITEMS, server500ErrorMessage } from '../constants';


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
