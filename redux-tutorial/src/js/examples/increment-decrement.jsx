// https://www.youtube.com/watch?v=ucd5x3Ka3gw&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt&index=3

import {createStore} from 'redux';

const reducer = function(state, action) {
    if (action.type === "INC") {
        return state + action.payload
    }
    else if (action.type === "DEC") {
        return state - action.payload
    }
    else {
        return state
    }
}

const store = createStore(reducer, 0)

store.subscribe(function() {
    console.log("store changed", store.getState())
})

store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 2})
store.dispatch({type: "INC", payload: 22})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "DEC", payload: 1000})
