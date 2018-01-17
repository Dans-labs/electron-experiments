import * as React from 'react'

interface ListItemProperties {
  content: string
  doubleClickHandler: () => void
}

export const ListItem: React.SFC<ListItemProperties> = ({content, doubleClickHandler}) => <li className='collection-item' onDoubleClick={doubleClickHandler}>{content}</li>
