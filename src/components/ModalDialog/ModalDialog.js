import React, { Component } from 'react'
import { Dialog } from "@reach/dialog";
import classes from './ModalDialog.module.css'


export class ModalDialog extends Component {

  state = {
    open: false,
    callback: null
  }

  show = callback => event => {
    event.preventDefault()

    event = {
      ...event,
      target: { ...event.target, value: event.target.value }
    }

    console.log(event)

    this.setState({
      open: true,
      callback: () => callback(event)
    })
  }

  hide = () => this.setState({ open: false, callback: null })

  confirm = () => {
    this.state.callback()
    this.hide()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.show)}

        {this.state.open && (
          <Dialog aria-label="Warning about next steps">
            <div className={classes.ModalDialog}>
              <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{this.props.title}</h5>
                    </div>
                    <div className="modal-body">
                      <p>{this.props.description}</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hide}>Cancel</button>
                      <button type="button" className="btn btn-primary" onClick={this.confirm}>Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </React.Fragment>
    )
  }
}
