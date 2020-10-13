import React, { Component } from 'react'
import axios from 'axios'
import {TodoItem} from '../TodoItem/TodoItem'

export class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }

    this.deleteHandler = this.deleteHandler.bind(this)
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

  deleteHandler(items){
    this.setState({items: items})
  //   console.log(this.state.ie)
  //   if(this.state.items.length){
  //     let itemData = [...this.state.items]
  //     itemData = itemData.map((item) => {
  //       if(+item.id !== +id){
  //         return item
  //       }
  //     })
  //     console.log(itemData)
  // }
  }

getItem(items){
  if(items.length){
    return items.map((item, index) => {
      return <TodoItem header = {item.header} descr = {item.descr} key={index + item.header} id={item.id} deleteHandler={this.deleteHandler} items={this.state.items}/>
    }) 
  } else {
    return <div>Задачи отсутствуют</div>
  }
}

  

  render() {
    // console.log(this.state.items)
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