import {combineReducers} from "redux"
import { reducer as formReducer } from 'redux-form'
import {usersReducer} from "./submitReducer"

export default combineReducers({
    form: formReducer,
    users: usersReducer,
})
