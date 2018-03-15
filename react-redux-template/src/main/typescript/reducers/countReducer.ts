import { CountConstants } from "../constants/countConstants"
import { Reducer } from "redux"
import { Counter, emptyCounter } from "../model/AppState"

export const countReducer: Reducer<Counter> = (state = emptyCounter, action) => {
    switch (action.type) {
        // TODO handle pending and rejected variants here as well!
        case CountConstants.INCREMENT: {
            return { ...state, value: state.value + action.payload }
        }
        case CountConstants.DECREMENT: {
            return { ...state, value: state.value - action.payload }
        }
        default:
            return state
    }
}
