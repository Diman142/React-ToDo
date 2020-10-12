import React, { Component } from 'react'
import axios from 'axios'

export class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    console.log(1)
    try {
      const response = await axios.get('https://react-todo-b0a36.firebaseio.com/task.json')

      const items = []

      Object.keys(response.data).forEach((key) => {
        items.push(response.data[key])
      })
      this.setState({ items })
      console.log(this.state.items)
    } catch (e) {
      console.error(e)
    }
  }

  render() {

    return (
      <div>
        <h2>Task List</h2>
        <ul>

        </ul>
      </div>
    )
  }
}