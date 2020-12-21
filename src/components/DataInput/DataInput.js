import React from "react"
import InputMask from "react-input-mask";
import classes from './DataInput.module.css'

function isInvalid(touched, valid){
  return !valid && touched
}

export function DateInput(props) {

  return (
    <div className="form-group">
    <label htmlFor={props.id}>{props.label}</label>
    <InputMask mask={props.mask} onChange={props.changeDeadline} value={props.deadline} className="form-control" id={props.id}/>
    {
      isInvalid(props.touched, props.valid) ? <span className={classes.errorMessage}>Не верный формат данных</span> : null
    }  
    </div>
  )
}

