// https://www.youtube.com/watch?v=gBER4Or86hE&index=4&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt

import {combineReducers, createStore} from 'redux';

const userReducer = (state={}, action) => {
    switch (action.type) {
        case "CHANGE_NAME": {
            state = {...state, name: action.payload}
            break;
        }
        case "CHANGE_AGE": {
            state = {...state, age: action.payload}
            break;
        }
    }
    return state
}

const tweetsReducer = (state=[], action) => {

    return state
}

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer
})

const store = createStore(reducers)

const x = store.subscribe(function() {
    console.log("store changed", store.getState())
})

store.dispatch({type: "CHANGE_NAME", payload: "Richard"})
store.dispatch({type: "CHANGE_AGE", payload: 25})
store.dispatch({type: "CHANGE_AGE", payload: 26})
