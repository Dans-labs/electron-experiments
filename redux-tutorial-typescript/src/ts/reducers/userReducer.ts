import {UserViewModel} from "../model/user"
import {Reducer} from "redux"
import {UserActionTypes} from "../constants/userConstants"

const initialState: UserViewModel = {
    user: {
        name: "",
        age: 0,
    },
    fetching: false,
    fetched: false,
}

export const user: Reducer<UserViewModel> = (state: UserViewModel = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER: {
            return {...state, fetching: true}
        }
        case UserActionTypes.FETCH_USER_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case UserActionTypes.FETCH_USER_FULFILLED: {
            return {...state, fetching: false, fetched: true, user: action.payload}
        }
        case UserActionTypes.SET_USER_NAME: {
            return {...state, user: {...state.user, name: action.payload}}
        }
        case UserActionTypes.SET_USER_AGE: {
            return {...state, user: {...state.user, age: action.payload}}
        }
    }
    return state
}
