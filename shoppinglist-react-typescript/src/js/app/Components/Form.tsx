import * as React from 'react'

interface FormProps {
  onSubmit: (value: string) => void
}

interface FormState {
  value: string
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (event: React.ChangeEvent<FormState>) => {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = this.state.value
    console.assert(value.length != 0, "value should not be empty")

    this.props.onSubmit(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Add an item</label>
          <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus />
        </div>
        <button className="btn waves-effect waves-light" type="submit" disabled={this.state.value.length == 0}>Add item...</button>
      </form>
    )
  }
}
