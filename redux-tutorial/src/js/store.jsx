import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import asyncAwait from 'redux-async-await';

import reducers from './reducers/index.jsx'

const middleware = applyMiddleware(asyncAwait, promise(), thunk, logger())

export default createStore(reducers, middleware)
