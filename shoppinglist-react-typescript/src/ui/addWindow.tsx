import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Form} from './addWindow/Form'

const AddWindow: React.SFC<{}> = () => <div className="container"><Form/></div>

ReactDOM.render(<AddWindow/>, document.getElementById('window'))
