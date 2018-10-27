import { FETCH_ITEMS, SET_FILTER, ADD_ITEM, REMOVE_ITEM, SET_M2M_FOREIGN_KEY_VALUE,
    SHOW_LOADING, SHOW_ERROR } from "../../constants";

/*
Defines STATE for the ManySelect component and initial defaults. Any key with a value of 'DEFINE'
must be initialized in the model reducer. Remaining items can also be modified or left as initialized here.

A placeholder item must be defined for ITEMS with the correct keys for the given model or component will fail
to load. For example, the following is defined for mutli-selecting Skills in association with a Role:

items: [ { id: 0, name: "placeholder", version: "placeholder", roles: [] }, ],
m2mModelField: "roles",

In this example, item.roles is an array of Role pks that have the given item (skill) as a m2m foreign key. The
value for the m2mModelField key must match the key within items. The m2mInstanceId is used to determine if this
specific instance of Role has this given item; i.e. if m2mInstanceId is found in item.roles, then the Role has
this skill (item).

Each time items (skills) are fetched, the m2m relationship is processed. However, only when the component is first
loaded are the values returned from the end point used to initialize selectItems with the id for each item where
m2mInstanceId is found in item.roles. From there, if a user adds or removes an item (skill), the pk is simply
added or removed from the selectItems using ADD_ITEM and REMOVE_ITEM. When Role is saved the current value of
selectItems is used to update the m2m relationship.
*/
export const base_reducer_state = {
    namespace: 'DEFINE',
    componentId: 'DEFINE',
    items: [ 'DEFINE PLACEHOLDER ITEM WITH CORRECT KEYS' ],
    selectItems: [],
    m2mModelField: 'DEFINE',
    m2mInstanceId: 0,
    pageSize: 20,
    currentPage: 1,
    filter: '',
    errorMessages: [],
    isError: false,
    isLoading: false,
    apiRoute: 'DEFINE',
};

// Processes state changes from actions for the Many Select component.
export function base_reducer(state, action) {
    switch (action.type) {
        case `${state.namespace}/${FETCH_ITEMS}`:
            let alreadySelected = [];
            if (action.initializeSelectItems) {
                for (let i = 0; i < action.items.length; i++) {
                    let foundKey = action.items[i][state.m2mModelField].indexOf(state.m2mInstanceId);
                    if (foundKey !== -1) { alreadySelected.push(action.items[i].id) }
                }
            } else {
                alreadySelected = state.selectItems.slice(0);
            }
            return {...state,
                "items": action.items,
                "selectItems": alreadySelected
            };
        case `${state.namespace}/${ADD_ITEM}`:
            let addedToPreSelected = state.selectItems.slice(0);
            addedToPreSelected.push(parseInt(action.itemValue, 10));
            return {...state,
                "selectItems": addedToPreSelected};
        case `${state.namespace}/${REMOVE_ITEM}`:
            let removedFromPreSelected = state.selectItems.slice(0);
            const index = removedFromPreSelected.indexOf(parseInt(action.itemValue, 10));
            if (index !== -1) {removedFromPreSelected.splice(index, 1);}
            return {...state,
                "selectItems": removedFromPreSelected};
        case `${state.namespace}/${SET_M2M_FOREIGN_KEY_VALUE}`:
            return {...state,
                "m2mInstanceId": action.newValue};
        case `${state.namespace}/${SET_FILTER}`:
            return {...state,
                "filter": action.newValue};
        case `${state.namespace}/${SHOW_ERROR}`:
            return {...state,
                "isError": action.trueFalse,
                "errorMessages": action.message};
        case `${state.namespace}/${SHOW_LOADING}`:
            return {...state,
                "isLoading": action.value};
        default:
            return state;
    }
}
