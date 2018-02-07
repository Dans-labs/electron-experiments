import * as UserConstants from "../constants/userConstants.jsx";

const defaultState = {
    user: {
        id: null,
        name: null,
        age: null
    },
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state=defaultState, action) {
    switch (action.type) {
        case UserConstants.FETCH_USER: {
            return {...state, fetching: true}
        }
        case UserConstants.FETCH_USER_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case UserConstants.FETCH_USER_FULFILLED: {
            return {...state, fetching: false, fetched: true, user: action.payload}
        }
        case UserConstants.SET_USER_NAME: {
            return {...state, user: {...state.user, name: action.payload}}
        }
        case UserConstants.SET_USER_AGE: {
            return {...state, user: {...state.user, age: action.payload}}
        }
    }

    return state
}
