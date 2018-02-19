import * as React from 'react'
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store"
import Header from "./components/Header"
import DemoForm from "./components/DemoForm"
import "../resources/css/styling"

ReactDOM.render(
    <Provider store={store}><div><Header/><DemoForm/></div></Provider>,
    document.getElementById('app'),
)
