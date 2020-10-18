import React, { Component } from 'react'
import axios from 'axios'
import {TodoItem} from '../TodoItem/TodoItem'
import {Loader} from '../../components/Loader/Loader'

export class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      loading: true,
    }

    this.deleteHandler = this.deleteHandler.bind(this)
  }



  async componentDidMount() {
    try {
      let userId = localStorage.getItem('userId')
      let token = localStorage.getItem('token')
      console.log(token)
      const response = await axios.get(`https://react-todo-b0a36.firebaseio.com/${userId}.json?auth=${token}`)
      const items = []
      if(response.data){
        Object.keys(response.data).forEach((key) => {
          items.push(response.data[key])
        })
      }
    
      this.setState({ items, loading: false})
    } catch (e) {
      console.error(e)
    }
  }

  deleteHandler(items){
    this.setState({items: items})
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
        {
          this.state.loading ? <Loader/>
          : <ul className="pl-0 row">
              {this.getItem(this.state.items)}
            </ul>
        }
      </div>
    )
  }
}