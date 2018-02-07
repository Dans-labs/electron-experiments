// https://www.youtube.com/watch?v=nrg7zhgJd4w&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt&index=7

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import Layout from "./components/Layout.jsx"
import store from "./store.jsx"

ReactDOM.render(<Provider store={store}><Layout/></Provider>, document.getElementById('app'))
