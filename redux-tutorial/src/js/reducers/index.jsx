import { combineReducers } from "redux"

import tweets from "./tweetsReducer.jsx"
import user from "./userReducer.jsx"

export default combineReducers({
    tweets,
    user,
})
