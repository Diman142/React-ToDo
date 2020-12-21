import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class TodoNav extends Component {
  renderLinks() {
    return this.props.links.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="nav-item" key={index + item.title}>
        <NavLink
          className="nav-link"
          to={item.path}
          exact={item.exact}
          activeClassName="active"
        >
          {item.title}
          <span className="sr-only">(current)</span>
        </NavLink>
      </li>
    ))
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">TODO-List</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {this.renderLinks()}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default TodoNav
