import {Reducer} from "redux"
import {OpenedCards} from "../model/AppState"
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
