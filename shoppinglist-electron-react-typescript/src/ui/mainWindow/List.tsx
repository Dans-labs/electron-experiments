import * as React from 'react'
import * as Electron from 'electron'
import { Item } from '../../models/Item'
import { ListItem } from './ListItem'
const { ipcRenderer } = Electron

interface ListState {
  items: Item[]
}

export class List extends React.Component<{}, ListState> {
  constructor(props: {}) {
    super(props)
    this.state = {items: []}
  }

  componentDidMount() {
    ipcRenderer.on('item:add', this.handleItemAddEvent)
    ipcRenderer.on('item:clear', this.handleItemClearEvent)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('item:add', this.handleItemAddEvent)
    ipcRenderer.removeListener('item:clear', this.handleItemClearEvent)
  }

  handleItemAddEvent = (event: Electron.IpcMessageEvent, item: Item) => {
    const newState = [...this.state.items, item]
    this.setState({items: newState})
  }

  handleItemClearEvent = (event: Electron.IpcMessageEvent, item: Item) => {
    this.setState({items: []})
  }

  handleRemoveItem(id: string) {
    const newState = this.state.items.filter(v => v.id != id)
    this.setState({items: newState})
  }

  render() {
    if (this.state.items.length == 0) {
      return (<div />)
    }
    return (
      <ul className="collection">{
        this.state.items.map(item => <ListItem key={item.id} content={item.value} doubleClickHandler={() => this.handleRemoveItem(item.id)} />)
      }</ul>
    )
  }
}
