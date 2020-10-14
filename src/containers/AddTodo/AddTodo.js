import React, {Component} from 'react'
import classes from './AddTodo.module.css'
import axios from 'axios'
import {Loader} from '../../components/Loader/Loader'


class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerValue: '',
      descrValue: '',
      loading: false,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHeadHandler = this.changeHeadHandler.bind(this);
    this.changeDescrHandler = this.changeDescrHandler.bind(this);
  }

  submitHandler(event){
    event.preventDefault();
    this.setState({
      loading: true
    })
    let data = {};
    data.header = this.state.headerValue; 
    data.descr = this.state.descrValue;
    data.id = +new Date();
    axios.post('https://react-todo-b0a36.firebaseio.com/task.json', data)
    .then((response) => {
      this.setState({loading: false})
    })
    .catch((error) => {
      console.error(error)
      this.setState({loading: false})
    })
  }

  changeHeadHandler(event){
    this.setState({
      headerValue: event.target.value
    })
  }

  changeDescrHandler(event){
    this.setState({
      descrValue: event.target.value
    })
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Loader/> 
        :
        <form className={classes.form} onSubmit={this.submitHandler}>
        <h2 className="text-center">Add your ToDos</h2>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Task Header</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Task Header" value={this.state.headerValue} onChange={this.changeHeadHandler} required/>
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Task Descrption</label>
          <textarea type="text" className={`${classes.formText} form-control`} id="formGroupExampleInput2" placeholder="Task Descrption" value={this.state.descrValue} onChange={this.changeDescrHandler} required/>
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
       </form>
        }
      </div>
    )
  }
}

export default AddTodo