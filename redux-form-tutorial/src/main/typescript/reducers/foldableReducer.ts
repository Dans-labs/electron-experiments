import {Reducer} from "redux"
import {Users} from "../model/AppState"
import * as uuid from 'uuid/v4'

export const foldableReducer: Reducer<string[]> = (state = [], action) => {
    switch (action.type) {
        case "TOGGLE_FOLDABLE":
            const id = action.payload
            const contained: boolean = state.some(value => value === id)
            if (contained) {
                return state.filter(value => value !== id)
            }
            else {
                return state.concat([id])
            }
    }
    return state
}
