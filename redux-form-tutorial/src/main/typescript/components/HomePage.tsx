import * as React from 'react'
import {Link} from "react-router-dom"

const HomePage = () => (
    <div className="home-container">
        <h1>Home!</h1>

        <Link className="button" to="/foldable">Check out these foldable elements</Link>
    </div>
)

export default HomePage
