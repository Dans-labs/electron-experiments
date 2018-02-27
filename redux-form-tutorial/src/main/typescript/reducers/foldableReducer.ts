import {Reducer} from "redux"
import {OpenedCards, Users} from "../model/AppState"
import * as uuid from 'uuid/v4'
import immutable from 'object-path-immutable'

export const foldableReducer: Reducer<OpenedCards> = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_FOLDABLE": {
            const {id, open} = action.payload
            return {...state, [id]: open}
        }
        case "UNREGISTER_FOLDABLE": {
            return immutable.del(state, action.payload)
        }
        case "TOGGLE_FOLDABLE": {
            const id = action.payload
            return {...state, [id]: !state[id]}
        }
    }
    return state
}
