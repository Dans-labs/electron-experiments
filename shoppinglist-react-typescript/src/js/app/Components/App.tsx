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
    this.setState(prevState => ({ ...prevState, items: [...prevState.items, new Item(value)] }))
  }

  removeItem = (id: string) => {
    this.setState(prevState => ({ ...prevState, items: prevState.items.filter(item => item.id != id) }))
  }

  clearItems = () => {
    this.setState(prevState => ({ ...prevState, items: [] }))
  }

  toggleDone = (id: string, done: boolean) => {
      this.setState(prevState => ({ ...prevState, items: prevState.items.map(item => item.id === id ? item.toggleDone(done) : item) }))
  }

  render() {
    return (
      <div>
        <Header>Shopping list</Header>
        <ShoppingList items={this.state.items}
                      onRemoveItem={this.removeItem}
                      onClearItems={this.clearItems}
                      itemDone={this.toggleDone} />
        <hr />
        <Form onSubmit={this.addItem} />
      </div>
    )
  }
}
