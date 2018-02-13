import {User, UserViewModel} from "../model/user"
import {Reducer} from "redux"
import {UserActionTypes} from "../constants/userConstants"
import {Lens} from "monocle-ts"

const initialState: UserViewModel = {
    user: {
        name: "",
        age: 0,
    },
    fetching: false,
    fetched: false,
}

// it turns out that Lens.fromPath slows down the performance of IntelliJ dramatically! DON'T use that method!!!
const fetchingLens = Lens.fromProp<UserViewModel, 'fetching'>('fetching')
const errorLens = new Lens<UserViewModel, [boolean, string|undefined]>(
    s => [s.fetching, s.error],
    a => s => ({...s, fetching: a[0], error: a[1]})
)
const receiveLens = new Lens<UserViewModel, [boolean, boolean, User]>(
    s => [s.fetching, s.fetched, s.user],
    a => s => ({...s, fetching: a[0], fetched: a[1], user: a[2]})
)
const userLens = Lens.fromProp<UserViewModel, 'user'>('user')
const nameLens = userLens.compose(Lens.fromProp<User, 'name'>('name'))
const ageLens = userLens.compose(Lens.fromProp<User, 'age'>('age'))

export const user: Reducer<UserViewModel> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER: {
            // return {...state, fetching: true}
            return fetchingLens.set(true)(state)
        }
        case UserActionTypes.FETCH_USER_REJECTED: {
            // return {...state, fetching: false, error: action.payload}
            return errorLens.set([false, action.payload])(state)
        }
        case UserActionTypes.FETCH_USER_FULFILLED: {
            // return {...state, fetching: false, fetched: true, user: action.payload}
            return receiveLens.set([false, true, action.payload])(state)
        }
        case UserActionTypes.SET_USER_NAME: {
            // return {...state, user: {...state.user, name: action.payload}}
            return nameLens.set(action.payload)(state)
        }
        case UserActionTypes.SET_USER_AGE: {
            // return {...state, user: {...state.user, age: action.payload}}
            return ageLens.set(action.payload)(state)
        }
    }
    return state
}
