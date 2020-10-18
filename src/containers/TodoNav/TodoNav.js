import React, { Component } from 'react'
import classes from './TodoNav.module.css'
import {NavLink} from 'react-router-dom'


const links = [
  {path: '/', title: 'Authentication', exact: true},
  {path: '/addToDo', title: 'Add-ToDo', exact: false},
  {path: '/TodoList', title: 'ToDo-List', exact: false},
  {path: '#', title: 'About', exact: false},
]

const linksNotToken = [
  {path: '/', title: 'Authentication', exact: true},
  {path: '#', title: 'About', exact: false},
]

class TodoNav extends Component {
  constructor(props){
    super(props)
  }

  renderLinks(){
    if(this.props.token){
      return links.map((item, index) => {
        return (
          <li className="nav-item" key={index + item.title}>
          <NavLink 
          className="nav-link" 
          to={item.path}
          exact={item.exact}
          activeClassName="active"
          >
          {item.title}<span className="sr-only">(current)</span>
          </NavLink>
          </li>
        )
      })
    } else {
      return linksNotToken.map((item, index) => {
        return (
          <li className="nav-item" key={index + item.title}>
          <NavLink 
          className="nav-link" 
          to={item.path}
          exact={item.exact}
          activeClassName="active"
          >
          {item.title}<span className="sr-only">(current)</span>
          </NavLink>
          </li>
        )
      })
    }
  }


  render() {
    return (
      <div className={classes.Todo}>
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