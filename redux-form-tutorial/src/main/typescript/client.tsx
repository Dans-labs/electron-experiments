import * as React from 'react'
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store"
import "../resources/css/styling"
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import NavigationBar from "./components/NavigationBar"
import RepeatableFormPage from "./components/RepeatableFormPage"
import DemoFormPage from "./components/DemoFormPage"
import FoldableFormPage from "./components/FoldablePage"
import HomePage from "./components/HomePage"
import {BrowserRouter} from "react-router-dom"
import {Route, Switch} from "react-router"
import LoadFromStateFormPage from "./components/LoadFromStateFormPage"
import ComposedFormPage from "./components/composed/ComposedFormPage"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <NavigationBar/>
                <Switch>
                    <Route path="/" component={HomePage} exact/>
                    <Route path="/demoform" component={DemoFormPage}/>
                    <Route path="/repeatable" component={RepeatableFormPage}/>
                    <Route path="/foldable" component={FoldableFormPage}/>
                    <Route path="/loadfromstate" component={LoadFromStateFormPage}/>
                    <Route path="/composed" component={ComposedFormPage}/>
                    <Route render={() => <p>Not Found</p>}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
)
