import {combineReducers} from "redux"
import {reducer as formReducer} from 'redux-form'
import {usersReducer} from "./submitReducer"
import toPath from 'lodash/topath'
import immutable from 'object-path-immutable'
import {foldableReducer} from "./foldableReducer"
import {initializeForm, loadFromStateReducer} from "./loadFromStateReducer"

function changeReducer(state, action) {
    switch (action.type) {
        case "@@redux-form/CHANGE":
            const fieldName = toPath(action.meta.field + ".changed")
            const newState = immutable.set(state.fields, fieldName, true)

            return {...state, fields: newState}
    }
    return state
}

export default combineReducers({
    form: formReducer.plugin({
        demo: changeReducer,
        repeatableform: changeReducer,
        loadfromstate: changeReducer,
    }),
    users: usersReducer,
    openedCards: foldableReducer,
    persons: loadFromStateReducer,
    initialState: initializeForm,
})
