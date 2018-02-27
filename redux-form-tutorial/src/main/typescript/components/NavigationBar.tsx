import * as React from "react"
import {NavLink} from "react-router-dom"

const NavigationBar = () => (
    <ul className="nav">
        <li><NavLink activeClassName="active" to="/" exact>Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/demoform">Demo form</NavLink></li>
        <li><NavLink activeClassName="active" to="/repeatable">Repeatable form</NavLink></li>
        <li><NavLink activeClassName="active" to="/foldable">Foldable form</NavLink></li>
    </ul>
)

export default NavigationBar
