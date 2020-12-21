import React, { Component } from 'react';

export class Alert extends Component {

  render() {

    return (
      <div className={`alert alert-dismissible ${this.props.alert.type || "alert-warning"}`} style={{ top: '-38px' }}>
        {this.props.alert.text}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.onClose}>
          &times;
        </button>
      </div>
    )
  }
}

