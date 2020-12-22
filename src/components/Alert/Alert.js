import React, { Component } from 'react';


// Alert component. I used this component in difernt part of app.
// To solve this problem, I used the context

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

