import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/index'

// import {Action} from 'redux'
// import {AppState} from './model/app'
// const predicate = (state: AppState, action: Action) => !action.type.startsWith('@@redux-form')

const predicate = () => true // if you want to see all actions

const newStore = () => {
    if (process.env.NODE_ENV === 'development') {
        const {createLogger} = require('redux-logger')
        const { composeWithDevTools } = require('redux-devtools-extension')
        const composeEnhancers = composeWithDevTools({ predicate })
        return createStore(
            reducers,
            composeEnhancers(applyMiddleware(thunkMiddleware/*, createLogger({ predicate })*/)),
        )
    }
    else
        return createStore(reducers, applyMiddleware(thunkMiddleware))
}

export default newStore()
