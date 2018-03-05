import * as React from 'react'

interface ShoppingListItemProps {
  id: string
  done: boolean
  doubleClickHandler: () => void
  itemDoneHandler: (done: boolean) => void
}

export class ShoppingListItem extends React.Component<ShoppingListItemProps, {}> {
  constructor(props: ShoppingListItemProps) {
    super(props)
  }

  toggleDone = (done: boolean) => {
    this.props.itemDoneHandler(done)
  }

  render() {
    const {id, done, doubleClickHandler, children} = this.props
    const checkboxId = `done-${id}`
    const content = ` ${children}`
    const text = done ? <s>{content}</s> : content

    return (
      <li className='collection-item'>
        <input type="checkbox"
               id={checkboxId}
               className="filled-in"
               onChange={e => this.toggleDone(e.target.checked)}/>
        <label htmlFor={checkboxId}>{text}</label>
        <i className="tiny material-icons" onClick={doubleClickHandler}>cancel</i>
      </li>
    )
  }
}
