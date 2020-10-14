import React, { Component } from 'react'
import classes from './Auth.module.css'
import {Input} from '../../components/input/Input'
import is from 'is_js'
import axios from 'axios'
import { Loader } from '../../components/Loader/Loader'

const apiKey = "AIzaSyAh2nPlAriQ0IBV70W13cVzRPrYAfO_JY0";

export class Auth extends Component {

  constructor(props){
    super(props)

    this.state = {
      loading: false,
      isFormValid: false,
      formFlag: true,
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Введите корректный Email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          }
        }
      }
    }

    this.getForm = this.getForm.bind(this)
  }

  toggleForm(){
    this.setState({formFlag: !this.state.formFlag})
  }

  validateControl(value, validation) {
    if(!validation) {
      return true
    }

    let isValid = true

    if(validation.required){
      isValid = value.trim() !== "" && isValid
    }

    if(validation.email){
      isValid = is.email(value) && isValid
    }

    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {

    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    
    formControls[controlName] = control
    
    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }


  renderInput() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input 
        key ={controlName + index}
        type={control.type}
        value={control.value}
        valid={control.valid}
        touched={control.touched}
        label={control.label}
        shouldValidate={!!control.validation}
        errorMessage={control.errorMessage}
        onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  getdata = () => {
    const userdata = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    return userdata
  }

  authHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const userData = this.getdata()
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, userData)
    .then((response) => {
      console.log(response)
      let formControls = this.state.formControls;
      formControls.email.value = ""
      formControls.password.value = ""

      this.setState({
        loading: false,
        formControls
      })
    })
    .catch((e) => {
      console.error(e)
      this.setState({loading: false})
    })
  }

  regHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const userData = this.getdata()
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, userData)
    .then((response) => {
      let formControls = this.state.formControls;
      formControls.email.value = ""
      formControls.password.value = ""
      
      this.setState({
        loading: false,
        formControls
      })
    })
    .catch((e) => {
      console.error(e)
      this.setState({loading: false})
    })
  }


  getForm(){
    if(this.state.formFlag){
      return(
        <div> 
          {this.state.loading ? <Loader/> : 
            <form className={classes.authForm} onSubmit={this.authHandler}>
              <h2 className="text-center">Вход</h2>
              {this.renderInput()}
              <button type="submit" className="btn btn-primary mt-3" disabled={!this.state.isFormValid}>Войти</button>
              <button type="button" className="btn btn-dark ml-2 mt-3" onClick={() => {this.toggleForm()}}>К регистрации</button>
            </form>
          }
        </div>
      )
    } else {
      return(
        <div>
          {this.state.loading ? <Loader/> :
            <form className={classes.authForm}  onSubmit={this.regHandler}>
              <h2 className="text-center">Регистрация</h2>
              {this.renderInput()}
              <button type="submit" className="btn btn-primary mt-3">Зарегистрироваться</button>
              <button type="button" className="btn btn-dark mt-3 ml-2" onClick={() => {this.toggleForm()}} disabled={!this.state.isFormValid}>Ко входу</button>
            </form>
          }
        </div>
      )
    }
  }


  render() {
    return (
       this.getForm()
    )
  }
}