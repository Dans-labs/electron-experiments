import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {ipcRenderer} from "electron"
import uuid from 'uuid/v4'

class Form extends Component {
  constructor() {
    super()
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    ipcRenderer.send('item:add', {id: uuid(), item: this.state.value})
  }

  handleCancel(event) {
    console.log('cancel button')
    event.preventDefault()
    ipcRenderer.send('item:cancel')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Enter Item</label>
          <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus/>
        </div>
        <button className="btn waves-effect waves-light" type="submit">Add Item</button>
        <button className="btn waves-effect waves-light" type="button" onClick={this.handleCancel}>Cancel</button>
      </form>
    )
  }
}

ReactDOM.render(<div className="container"><Form/></div>, document.getElementById('window'))
