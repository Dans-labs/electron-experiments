import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {ipcRenderer} from "electron"

const Header = () => <nav><div className="nav-wrapper"><a className="brand-logo center">Shopping list</a></div></nav>

class List extends Component {
  constructor() {
    super()
    this.state = {items: []}
  }

  componentDidMount() {
    ipcRenderer.on('item:add', this.handleItemAddEvent.bind(this))
    ipcRenderer.on('item:clear', this.handleItemClearEvent.bind(this))
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('item:add', this.handleItemAddEvent.bind(this))
    ipcRenderer.removeListener('item:clear', this.handleItemClearEvent.bind(this))
  }

  handleItemAddEvent(event, item) {
    const newState = [...this.state.items, item]
    this.setState({items: newState})
  }

  handleItemClearEvent(event, item) {
    this.setState({items: []})
  }

  handleRemoveItem(id) {
    const newState = this.state.items.filter(v => v.id != id)
    this.setState({items: newState})
  }

  render() {
    console.log("render ", this.state)
    if (this.state.items.length == 0) {
      return (<div/>)
    }
    return (
      <ul className="collection">{
        this.state.items
          .map(item => <ListItem key={item.id} content={item.item} doubleClickHandler={() => this.handleRemoveItem(item.id)}/>)
      }</ul>
    )
  }
}

const ListItem = ({content, doubleClickHandler}) => <li className='collection-item' onDoubleClick={doubleClickHandler}>{content}</li>

const App = () => <div><Header/><List/></div>

ReactDOM.render(<App/>, document.getElementById('app'))
