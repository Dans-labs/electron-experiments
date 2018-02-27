import {Reducer} from "redux"
import {OpenedCards, Users} from "../model/AppState"
import * as uuid from 'uuid/v4'

export const foldableReducer: Reducer<OpenedCards> = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_FOLDABLE":
            const [id, open] = action.payload

            return {...state, [id]: open}
        case "TOGGLE_FOLDABLE":
            const id2 = action.payload

            return {...state, [id2]: !state[id2]}
    }
    return state
}
