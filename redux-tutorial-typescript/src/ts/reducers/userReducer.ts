import {User, UserViewModel} from "../model/user"
import {AnyAction, Reducer} from "redux"
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

const fetchingLens = Lens.fromProp<UserViewModel, 'fetching'>('fetching')
const errorLens = new Lens<UserViewModel, [boolean, string|undefined]>(
    s => [s.fetching, s.error],
    a => s => ({...s, fetching: a[0], error: a[1]})
)
const receiveLens = new Lens<UserViewModel, [boolean, boolean, User]>(
    s => [s.fetching, s.fetched, s.user],
    a => s => ({...s, fetching: a[0], fetched: a[1], user: a[2]})
)
const name = Lens.fromPath<UserViewModel, 'user', 'name'>(['user', 'name'])
const age = Lens.fromPath<UserViewModel, 'user', 'age'>(['user', 'age'])

export const user: Reducer<UserViewModel> = (state: UserViewModel = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER: {
            return fetchingLens.set(true)(state)
        }
        case UserActionTypes.FETCH_USER_REJECTED: {
            return errorLens.set([false, action.payload])(state)
        }
        case UserActionTypes.FETCH_USER_FULFILLED: {
            return receiveLens.set([false, true, action.payload])(state)
        }
        case UserActionTypes.SET_USER_NAME: {
            return name.set(action.payload)(state)
        }
        case UserActionTypes.SET_USER_AGE: {
            return age.set(action.payload)(state)
        }
    }
    return state
}
