// https://www.youtube.com/watch?v=Td-2D-_7Y2E&index=6&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt

import {applyMiddleware, createStore} from 'redux';
import axios from 'axios'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_USERS_FULFILLED": {
            return {...state, fetching: false, fetched: true, users: action.payload.data}
        }
        case "FETCH_USERS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
    }
    return state
}

const middleware = applyMiddleware(promise(), logger())
const store = createStore(reducer, middleware)

store.subscribe(function() {
    console.log("store changed", store.getState())
})

store.dispatch({
    type: "FETCH_USERS",
    payload: axios.get("http://rest.learncode.academy/api/wstern/users")
})
