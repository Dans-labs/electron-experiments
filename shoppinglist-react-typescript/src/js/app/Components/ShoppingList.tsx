import * as React from 'react'
import { Item } from '../Model/Item'
import { ShoppingListItem } from './ShoppingListItem'

interface ShoppingListProps {
  items: Item[]
  onRemoveItem: (item: string) => void
  onClearItems: () => void
}

export class ShoppingList extends React.Component<ShoppingListProps, {}> {
  constructor(props: ShoppingListProps) {
    super(props)
  }

  render() {
    const isEmpty = this.props.items.length == 0
    const form = isEmpty ? <div /> :
      <ul className="collection">{
        this.props.items.map(item => <ShoppingListItem key={item.id} doubleClickHandler={() => this.props.onRemoveItem(item.id)}>{item.value}</ShoppingListItem>)
      }</ul>

    return (
      <div>
        <button className="btn waves-effect waves-light" disabled={isEmpty} onClick={this.props.onClearItems}>Clear shopping list</button>
        {form}
      </div>
    )
  }
}
