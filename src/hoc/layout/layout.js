import React, { Component } from 'react';
import classes from './layout.module.css'


class Layout extends Component {
  render() {
    return (
      <div className={`container ${classes.Layout}`}>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout
