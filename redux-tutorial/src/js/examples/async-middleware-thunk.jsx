// https://www.youtube.com/watch?v=Td-2D-_7Y2E&index=6&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt

import {applyMiddleware, createStore} from 'redux';
import axios from 'axios'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_START": {
            return {...state, fetching: true}
        }
        case "RECEIVE_USERS": {
            return {...state, fetching: false, fetched: true, users: action.payload}
        }
        case "FETCH_USERS_ERROR": {
            return {...state, fetching: false, error: action.payload}
        }
    }
    return state
}

const middleware = applyMiddleware(thunk, logger())
const store = createStore(reducer, middleware)

store.subscribe(function() {
    console.log("store changed", store.getState())
})

store.dispatch(function(dispatch) {
    dispatch({type: "FETCH_USERS_START"})
    axios.get("http://rest.learncode.academy/api/wstern/users")
        .then(function(response) {
            dispatch({type: "RECEIVE_USERS", payload: response.data})
        })
        .catch(function(err) {
            dispatch({type: "FETCH_USERS_ERROR", payload: err})
        })
})
