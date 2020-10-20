import React from 'react'
import {NavLink} from 'react-router-dom'

export const About = (props) => {

  return (
    <div className="jumbotron mt-4"> 
      <h1 className="display-4">V.1.0. TODO-List App</h1>
      <p className="lead">Application was created for testing React-library functionality</p>
      <hr className="my-4"/>
      <p>This app is simple TO-DO List. For testing this functionaloty you should be autorizated.</p>
      <NavLink className="btn btn-primary btn-lg" to="/" exact={true}>Go to auth</NavLink>
    </div>
  )
}