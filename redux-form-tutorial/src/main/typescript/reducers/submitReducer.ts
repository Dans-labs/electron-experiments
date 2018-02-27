import {Reducer} from "redux"
import {Users} from "../model/AppState"
import * as uuid from 'uuid/v4'

export const usersReducer: Reducer<Users> = (state = [], action) => {
    switch (action.type) {
        case "ADD_USER":
            const name = action.payload
            const user = {id: uuid(), name}
            return [...state, user]
        case "REMOVE_USER":
            const id = action.payload
            return state.filter(value => value.id !== id)
    }
    return state
}
