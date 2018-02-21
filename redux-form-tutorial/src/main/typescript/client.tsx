import * as React from 'react'
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store"
import Header from "./components/Header"
import {SimpleForm} from "./components/SimpleForm/SimpleForm"
import "../resources/css/styling"
// import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Header/>
            <SimpleForm/>
        </div>
    </Provider>,
    document.getElementById('app'),
)
