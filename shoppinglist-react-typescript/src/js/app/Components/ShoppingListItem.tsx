import * as React from 'react'

interface ShoppingListItemProps {
  children: string
  doubleClickHandler: () => void
}

export class ShoppingListItem extends React.Component<ShoppingListItemProps, {}> {
  constructor(props: ShoppingListItemProps) {
    super(props)
  }

  render() {
    return (
      <li className='collection-item' onDoubleClick={this.props.doubleClickHandler}>
        {this.props.children}
      </li>
    )
  }
}
