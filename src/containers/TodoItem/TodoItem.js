import React, { useState } from 'react';
import classes from './TodoItem.module.css'


export function TodoItem(props) {
  const [disabledBtn, setDisabledBtn] = useState(true)

  function completeTask(event){
    let parent = event.target.parentNode
    parent.style.opacity = 0.5;
    setDisabledBtn(!disabledBtn);
  }

  function backTask(event){
    let parent = event.target.parentNode
    parent.style.opacity = 1;
    setDisabledBtn(!disabledBtn);
  }

  function deleteItem(event){
    let parent = event.target.parentNode;
    parent.querySelector('.btn-primary').removeEventListener('click', completeTask);
    parent.querySelector('.btn-danger').removeEventListener('click', backTask)
    parent.remove();
  }

  return (
    
    <li style={{listStyle: 'none'}} className="card-body col-lg-4 mt-2 position-relative">
      <h5 className="card-title">{props.header}</h5>
      <p className="card-text">{props.descr}</p>
      <p className="card-text"><small className="text-muted">Срок выполнения: {"не указан"}</small></p>
      <button className="btn btn-primary mr-2" onClick={completeTask} disabled={!disabledBtn}>Завершить</button>
      <button style={{backgroundColor: "red"}} className="btn btn-danger" onClick={backTask} disabled={disabledBtn}>Вернуться</button>
      <button type="button" className={`close ${classes.closeTodo}`} aria-label="Close" onClick={deleteItem}>&times;</button>
    </li>
  )
}