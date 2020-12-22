import React from 'react'
import classes from './Input.module.css'

// Custom input component with validation

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

export const Input = props => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        autoComplete={false}
      />

      {
        isInvalid(props) ? <span>{props.errorMessage || "Введите верное значение"}</span> : null
      }

    </div>
  )
}

