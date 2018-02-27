import * as React from 'react'
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store"
import Header from "./components/Header"
import UsersList from "./components/UsersList"
import DemoForm from "./components/DemoForm"
import RepeatableForm from "./components/RepeatableForm"
import "../resources/css/styling"
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import FoldableForm from "./components/FoldableForm"

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Header/>
            {/*<UsersList/>*/}
            {/*<DemoForm/>*/}
            {/*<RepeatableForm/>*/}
            <FoldableForm/>
        </div>
    </Provider>,
    document.getElementById('app'),
)
