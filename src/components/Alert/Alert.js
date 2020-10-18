import React, { Component } from 'react';
import {AlertContext} from '../../context/AlertContext/AlertContext'

import './Alert.module.css'

export class Alert extends Component {
  constructor(props){
    super(props)

  }
  render(){
    console.log(this.props)
    // let props = this.props
    // let alertData = this.context
    return (
      <div className={`alert alert-dismissible ${this.props.alert.type || "alert-warning"}`} style={{top: '-38px'}}>
        {this.props.alert.text}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.onClose}>
          &times;
        </button>
      </div>
    )
  }
}

// Alert.contextType = AlertContext