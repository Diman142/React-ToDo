import React, { Component } from 'react'
import axios from 'axios'
import {TodoItem} from '../TodoItem/TodoItem'

export class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  getItem(items){
    if(items.length){
      return items.map((item, index) => {
        return <TodoItem header = {item.header} descr = {item.descr} key={index + item.header}/>
      }) 
    } else {
      return <div>Задачи отсутствуют</div>
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-todo-b0a36.firebaseio.com/task.json')
      const items = []
      
      if(response.data){
        Object.keys(response.data).forEach((key) => {
          items.push(response.data[key])
        })
      }
    
      this.setState({ items })
    } catch (e) {
      console.error(e)
    }
  }

  

  render() {
    return (
      <div>
        <h2 className="mt-4 text-center">Todo-List</h2>
        <ul className="pl-0 row">
          {this.getItem(this.state.items)}
        </ul>
      </div>
    )
  }
}