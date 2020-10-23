import React, {Component} from 'react'
import classes from './AddTodo.module.css'
import axios from 'axios'
import {Loader} from '../../components/Loader/Loader'
import {AlertContext} from '../../context/AlertContext/AlertContext'
import {Alert} from '../../components/Alert/Alert'
import {DateInput} from '../../components/DataInput/DataInput'



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
      deadlineDate: '',
      deadlineTime: '',
      dateValid: false,
      timeValid: false,
      dateTouched: false,
      timeTouched: false,

    };


    this.submitHandler = this.submitHandler.bind(this);
    this.changeHeadHandler = this.changeHeadHandler.bind(this);
    this.changeDescrHandler = this.changeDescrHandler.bind(this);
    this.DeadlineDateHandler = this.DeadlineDateHandler.bind(this);
    this.DeadlineTimeHandler = this.DeadlineTimeHandler.bind(this);
  }

  submitHandler(event){
    event.preventDefault();
    this.setState({
      loading: true
    })
    let data = {};
    data.header = this.state.headerValue; 
    data.descr = this.state.descrValue;
    data.deadlineDate = this.state.deadlineDate;
    data.deadlineTime = this.state.deadlineTime;
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

  validationDate(date){
    let arr = date.split('')
    arr = arr.filter((item) => {
      if(Number(item) || Number(item) === 0){
        return item
      }
    })
    if(arr.length === 8){
      let dateElem = date.split('-')
      if(dateElem[0] <= 31 && dateElem[1] <= 12){
        let deadlineDate = new Date(dateElem[2], dateElem[1] - 1, dateElem[0])
        if(deadlineDate - new Date() >= 0){
          this.setState({dateValid: true})
        }else {
          this.setState({dateValid: false})
        }
      }else {
        this.setState({dateValid: false})
      }
    } else {
      this.setState({dateValid: false})
    }
  }

  validationTime(time){
    let arr = time.split('')
    arr = arr.filter((item) => {
      if(Number(item) || Number(item) === 0){
        return item
      }
    })
    if(arr.length === 4){
      let timeElem = time.split(':')
      if(timeElem[0] < 24 && timeElem[1] < 60){
        this.setState({timeValid: true})
      } else {
        this.setState({timeValid: false})
      }
    } else {
      this.setState({timeValid: false})
    }
  }


  DeadlineDateHandler(event){
    let date = event.target.value
    this.validationDate(date)
    this.setState({
      deadlineDate: date,
      dateTouched: true,
    })
  }

  DeadlineTimeHandler(event){
    let time = event.target.value
    this.validationTime(time)
    this.setState({
      deadlineTime: time,
      timeTouched: true,
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
              <DateInput id="userdate" label="Task deadline date" mask="99-99-9999" deadline={this.deadlineDate} changeDeadline={this.DeadlineDateHandler} valid={this.state.dateValid} touched={this.state.dateTouched}/>
              <DateInput id="usertime" label="Task deadline time" mask="99:99" deadline={this.deadlineTime} changeDeadline={this.DeadlineTimeHandler} valid={this.state.timeValid}  touched={this.state.timeTouched}/>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
        </div>

        }
      </div>
    )
  }
}

export default AddTodo