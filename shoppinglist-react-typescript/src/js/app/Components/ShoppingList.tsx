import * as React from 'react'
import { Item } from '../Model/Item'
import { ShoppingListItem } from './ShoppingListItem'

interface ShoppingListProps {
  items: Item[]
  onRemoveItem: (item: string) => void
  onClearItems: () => void
  itemDone: (id: string, done: boolean) => void
}

export class ShoppingList extends React.Component<ShoppingListProps, {}> {
  constructor(props: ShoppingListProps) {
    super(props)
  }

  render() {
    const isEmpty = this.props.items.length == 0
    const list = isEmpty ? <div /> :
      <ul className="collection">{
        this.props.items.map(item =>
            <ShoppingListItem key={item.id}
                              id={item.id}
                              done={item.done}
                              doubleClickHandler={() => this.props.onRemoveItem(item.id)}
                              itemDoneHandler={(done) => this.props.itemDone(item.id, done)}>
                {item.value}
            </ShoppingListItem>
        )
      }</ul>

    return (
      <div>
        <button className="btn waves-effect waves-light" disabled={isEmpty} onClick={this.props.onClearItems}>Clear shopping list</button>
        {list}
      </div>
    )
  }
}
