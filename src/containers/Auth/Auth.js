import React, { Component } from 'react'
import classes from './Auth.module.css'
import {Input} from '../../components/input/Input'

export class Auth extends Component {

  constructor(props){
    super(props)

    this.state = {
      formFlag: true
    }

    this.getForm = this.getForm.bind(this)
  }

  toggleForm(){
    this.setState({formFlag: !this.state.formFlag})
  }

  authHandler = (event) => {
    event.preventDefault()
  }

  regHandler = (event) => {
    event.preventDefault()
  }


  getForm(){
    if(this.state.formFlag){
      return(
        <form className={classes.authForm} onSubmit={this.authHandler}>
        <h2 className="text-center">Вход</h2>
        <Input label="Email" errorMessage={"test"}/>
        <Input label="Password"/>
        <button type="submit" className="btn btn-primary">Войти</button>
        <button type="button" className="btn btn-dark ml-2" onClick={() => {this.toggleForm()}}>К регистрации</button>
      </form>
      )
    } else {
      return(
      <form className={classes.authForm}  onSubmit={this.regHandler}>
        <h2 className="text-center">Регистрация</h2>
        <Input label="Email"/>
        <Input label="Password"/>
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
        <button type="button" className="btn btn-dark ml-2" onClick={() => {this.toggleForm()}}>Ко входу</button>
    </form>
      )
    }
  }


  render() {
    return this.getForm()
  }
}