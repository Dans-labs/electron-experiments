import * as React from 'react'
import * as Electron from "electron"
import * as uuid from 'uuid/v4'
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
const { ipcRenderer } = Electron

interface FormState {
  value: string
}

export class Form extends React.Component<{}, FormState> {
  constructor(props: {}) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (event: ChangeEvent<FormState>) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    ipcRenderer.send('item:add', { id: uuid(), value: this.state.value })
  }

  handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    ipcRenderer.send('item:cancel')
  }

  // TODO: is this complete form rendered every time a letter is typed? How can this be improved?
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Enter Item</label>
          <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus />
        </div>
        <button className="btn waves-effect waves-light" type="submit">Add Item</button>
        <button className="btn waves-effect waves-light" type="button" onClick={this.handleCancel}>Cancel</button>
      </form>
    )
  }
}
