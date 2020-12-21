import React from 'react'
import { Redirect } from 'react-router-dom'


export const Logout = (props) => {

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userPassword')
    props.changeToken()
  }

  return (
    <div>
      {props.redir ? <Redirect to="/" />
        : (
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-danger" onClick={logout}>Выйти</button>
          </div>
        )}
    </div>
  )
}
