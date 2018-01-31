import * as React from 'react'

export class Header extends React.Component<{}, {}> {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo center">{this.props.children}</a>
        </div>
      </nav>
    )
  }
}
