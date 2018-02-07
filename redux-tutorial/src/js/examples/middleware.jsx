// https://www.youtube.com/watch?v=DJ8fR0mZM44&index=5&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt

import {applyMiddleware, createStore} from 'redux';

const reducer = function(state, action) {
    if (action.type === "INC") {
        return state + 1
    }
    else if (action.type === "DEC") {
        return state - 1
    }
    else if (action.type === "ERR") {
        throw new Error("boem")
    }
    else {
        return state
    }
}

const logger = (store) => (next) => (action) => {
    console.log("action fired" , action)
    next(action)
}

const error = (store) => (next) => (action) => {
    try {
        next(action)
    }
    catch (e) {
        console.error("error", e)
    }
}

const middleware = applyMiddleware(logger, error)

const store = createStore(reducer, 1, middleware)

store.subscribe(function() {
    console.log("store changed", store.getState())
})

store.dispatch({type: "INC"})
store.dispatch({type: "INC"})
store.dispatch({type: "INC"})
store.dispatch({type: "DEC"})
store.dispatch({type: "DEC"})
store.dispatch({type: "DEC"})
store.dispatch({type: "ERR"})
