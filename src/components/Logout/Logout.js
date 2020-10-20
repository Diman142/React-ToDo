import React from 'react'


export const Logout = (props) => {

  function Logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userPassword')
    window.location.reload();
  }

  return (
    <div className={`d-flex justify-content-end`}>
      <button className="btn btn-danger" onClick={Logout}>Выйти</button>
    </div>
  )
}