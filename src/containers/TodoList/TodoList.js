/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import axios from 'axios'
import { TodoItem } from '../TodoItem/TodoItem'
import { Loader } from '../../components/Loader/Loader'
import { Alert } from '../../components/Alert/Alert'
import { AlertContext } from '../../context/AlertContext/AlertContext'


// Use class component for practice with this types of component

export class TodoList extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = AlertContext


  constructor(props) {
    super(props)

    this.state = {
      items: [],
      loading: true,
      isModalOpen: false,
      isAlertSuccess: false,
      isAlertFailure: false,
    }

    this.toggleAlertSuccess = this.toggleAlertSuccess.bind(this)
    this.toggleAlertFailure = this.toggleAlertFailure.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  async componentDidMount() {
    try {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      const response = await axios.get(`https://react-todo-b0a36.firebaseio.com/${userId}.json?auth=${token}`)
      const items = []
      if (response.data) {
        Object.keys(response.data).forEach((key) => {
          items.push(response.data[key])
        })
      }

      this.setState({ items, loading: false })
    } catch (e) {
      console.error(e)
    }
  }

  getItem(items) {
    if (items.length) {
      // eslint-disable-next-line react/no-array-index-key
      return items.map((item, index) => <TodoItem header={item.header} descr={item.descr} key={index + item.header} id={item.id} deleteHandler={this.deleteHandler} items={this.state.items} toggleModal={this.toggleModal} toggleAlertSuccess={this.toggleAlertSuccess} toggleAlertFailure={this.toggleAlertFailure} deadlineDate={item.deadlineDate} deadlineTime={item.deadlineTime} />)
    }
    return <div style={{ width: '100%' }} className="alert alert-primary mt-4">На данный момент у вас нет задач. Добавьте задачи во вкладке "Add-ToDo"</div>

  }

  deleteHandler(items) {
    this.setState({ items })
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  toggleAlertSuccess() {
    this.setState({ isAlertSuccess: !this.state.isAlertSuccess })
  }

  toggleAlertFailure() {
    this.setState({ isAlertFailure: !this.state.isAlertFailure })
  }


  render() {
    const alertData = this.context
    return (
      <div>
        {this.state.isAlertSuccess ? <Alert alert={alertData.deleteSucces} onClose={this.toggleAlertSuccess} /> : null}
        {this.state.isAlertFailure ? <Alert alert={alertData.deleteFailure} onClose={this.toggleAlertFailure} /> : null}
        <h2 className="mt-4 text-center">Todo-List</h2>
        {
          this.state.loading ? <Loader />
            : (
              <ul className="pl-0 row">
                {this.getItem(this.state.items)}
              </ul>
            )
        }
      </div>
    )
  }
}




