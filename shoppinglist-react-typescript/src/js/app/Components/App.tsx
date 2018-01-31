import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Item } from '../Model/Item'
import { Header } from './Header'
import { ShoppingList } from './ShoppingList'
import { Form } from './Form'

interface AppState {
  items: Item[]
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      items: [
        new Item("foo"),
        new Item("bar")
      ]
    }
  }

  addItem = (value: string) => {
    const newState = [...this.state.items, new Item(value)]
    this.setState({ ...this.state, items: newState })
  }

  removeItem = (id: string) => {
    const newState = this.state.items.filter(item => item.id != id)
    this.setState({ ...this.state, items: newState })
  }

  clearItems = () => {
    this.setState({ ...this.state, items: [] })
  }

  render() {
    return (
      <div>
        <Header>Shopping list</Header>
        <ShoppingList items={this.state.items} onRemoveItem={this.removeItem} onClearItems={this.clearItems} />
        <hr />
        <Form onSubmit={this.addItem} />
      </div>
    )
  }
}
