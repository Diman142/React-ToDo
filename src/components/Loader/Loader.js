import React from 'react'
import classes from './Loader.module.css'


export const Loader = props => {
  return (
    <div className={classes.Loader}><div className={classes.LoaderMain}>
      <div></div>
    </div></div>
  )
}
