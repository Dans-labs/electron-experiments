import { AnyAction, combineReducers } from "redux"
import {reducer as formReducer} from 'redux-form'
import {usersReducer} from "./submitReducer"
import {toPath} from 'lodash'
import immutable from 'object-path-immutable'
import {foldableReducer} from "./foldableReducer"
import {initializeForm, loadFromStateReducer} from "./loadFromStateReducer"
import { FormState } from "redux-form/lib/reducer"

function changeReducer(state: FormState, action: AnyAction) {
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
