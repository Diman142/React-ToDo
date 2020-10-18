import React, {Component} from 'react'
import classes from './AddTodo.module.css'
import axios from 'axios'
import {Loader} from '../../components/Loader/Loader'
import {AlertContext, alerts} from '../../context/AlertContext/AlertContext'
import {Alert} from '../../components/Alert/Alert'



class AddTodo extends Component {
  static contextType = AlertContext

  constructor(props) {
    super(props);
    this.state = {
      headerValue: '',
      descrValue: '',
      loading: false,
      succes: false,
      failure: false,
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
    
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    axios.post(`https://react-todo-b0a36.firebaseio.com/${userId}.json?auth=${token}`, data)
    .then((response) => {
      this.setState({
        loading: false, 
        succes: true,
        headerValue: '',
        descrValue: '',
      })
    })
    .catch((error) => {
      console.error(error)
      this.setState({
        loading: false, 
        failure: true,
        headerValue: '',
        descrValue: '',
      })
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


  getAlert(){
    const alertData = this.context
    if(!alertData){
      return null
    } else {
      if(this.state.succes){
        return <Alert alert={alertData.succes} onClose={() => this.setState({succes: false})}/>
      }
      else if(this.state.failure){
        return <Alert alert={alertData.danger} onClose ={() => this.setState({failure: false})}/>
      } else{
        return null
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Loader/> 
        :
        <div> 
          {this.getAlert()}
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
        </div>

        }
      </div>
    )
  }
}

export default AddTodo