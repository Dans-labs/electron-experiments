import * as React from 'react'
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store"
import Header from "./components/Header"

ReactDOM.render(
    <Provider store={store}><Header/></Provider>,
    document.getElementById('app')
)
