import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Electron from 'electron'
import * as uuid from 'uuid/v4'
import {List} from './mainWindow/List'
const {ipcRenderer} = Electron

const Header = () => <nav><div className="nav-wrapper"><a className="brand-logo center">Shopping list</a></div></nav>

const MainWindow: React.SFC<{}> = () => <div><Header/><List/></div>

ReactDOM.render(<div><Header/><List/></div>, document.getElementById('app'))
