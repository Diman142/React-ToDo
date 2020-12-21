import React, { Component } from 'react'
import classes from './Auth.module.css'
import { Input } from '../../components/input/Input'
import is from 'is_js'
import axios from 'axios'
import { Loader } from '../../components/Loader/Loader'
import { AlertContext } from '../../context/AlertContext/AlertContext'
import { Alert } from '../../components/Alert/Alert'

const apiKey = "AIzaSyAh2nPlAriQ0IBV70W13cVzRPrYAfO_JY0";

export class Auth extends Component {
  static contextType = AlertContext

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      isFormValid: false,
      formFlag: true,
      regSuccess: false,
      regFailure: false,
      authSuccess: false,
      authFailure: false,
      startAuth: true,
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

  toggleForm() {
    this.setState({ formFlag: !this.state.formFlag })
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== "" && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      regSuccess: false,
      regFailure: false,
      authSuccess: false,
      authFailure: false,
      formControls, isFormValid
    })
  }


  renderInput() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
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

  timerAuthFunction = () => {
    let email = localStorage.getItem('userEmail')
    let password = localStorage.getItem('userPassword')

    if (email && password) {
      axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true
      })
        .then(response => {
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
          localStorage.removeItem('token')
          localStorage.removeItem('expirationDate')
          localStorage.setItem('token', response.data.idToken)
          localStorage.setItem('expirationDate', expirationDate)

          this.props.changeToken()
        })
        .catch(e => console.log(e))
    } else {
      return null
    }
  }


  resetAuth() {
    let time = new Date(localStorage.getItem('expirationDate')) - new Date()
    let timerId = setInterval(() => {
      let token = localStorage.getItem('token')
      if (!token) {
        clearInterval(timerId)
      } else {
        this.timerAuthFunction()
      }
    }, time)
  }


  authHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const userData = this.getdata()
    localStorage.setItem('userEmail', userData.email)
    localStorage.setItem('userPassword', userData.password)
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, userData)
      .then((response) => {
        let formControls = this.state.formControls;
        formControls.email.value = ""
        formControls.password.value = ""

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expirationDate)



        this.props.changeToken()
        this.resetAuth()

        this.setState({
          loading: false,
          formControls,
          authSuccess: true
        })
      })
      .catch((e) => {
        console.error(e)
        this.setState({
          loading: false,
          authFailure: true
        })
      })
  }

  regHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const userData = this.getdata()
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, userData)
      .then((response) => {
        let formControls = this.state.formControls;
        formControls.email.value = ""
        formControls.password.value = ""

        this.setState({
          loading: false,
          formControls,
          regSuccess: true,
        })
      })
      .catch((e) => {
        console.error(e)
        this.setState({
          loading: false,
          regFailure: true
        })
      })
  }

  getAlert() {
    const alertData = this.context
    if (!alertData) {
      return null
    } else {
      if (this.state.regSuccess) {
        return <Alert alert={alertData.regsuccess} onClose={() => this.setState({ regSuccess: false })} />
      }
      else if (this.state.regFailure) {
        return <Alert alert={alertData.regfailure} onClose={() => this.setState({ regFailure: false })} />
      }
      else if (this.state.authSuccess) {
        return <Alert alert={alertData.authsucces} onClose={() => this.setState({ authSuccess: false })} />
      }
      else if (this.state.authFailure) {
        return <Alert alert={alertData.authfailure} onClose={() => this.setState({ authFailure: false })} />
      }
      else {
        return null
      }
    }
  }


  getForm() {
    if (this.state.formFlag) {
      return (
        <div>
          {this.state.loading ? <Loader /> :
            <div>
              {this.getAlert()}
              <form className={classes.authForm} onSubmit={this.authHandler}>
                <h2 className="text-center">Вход</h2>
                {this.renderInput()}
                <button type="submit" className="btn btn-primary mt-3" disabled={!this.state.isFormValid}>Войти</button>
                <button type="button" className="btn btn-dark ml-2 mt-3" onClick={() => { this.toggleForm() }}>К регистрации</button>
              </form>
            </div>
          }
        </div>
      )
    } else {
      return (
        <div>
          {this.state.loading ? <Loader /> :
            <div>
              {this.getAlert()}
              <form className={classes.authForm} onSubmit={this.regHandler}>
                <h2 className="text-center">Регистрация</h2>
                {this.renderInput()}
                <button type="submit" className="btn btn-primary mt-3" disabled={!this.state.isFormValid}>Зарегистрироваться</button>
                <button type="button" className="btn btn-dark mt-3 ml-2" onClick={() => { this.toggleForm() }}>Ко входу</button>
              </form>
            </div>
          }
        </div>
      )
    }
  }


  render() {

    return (
      <div>
        {this.getForm()}
      </div>

    )
  }
}
