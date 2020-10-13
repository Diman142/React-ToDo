import React, { useState } from 'react';
import classes from './TodoItem.module.css'
import axios from 'axios'

const url = 'https://react-todo-b0a36.firebaseio.com/task/';
export function TodoItem(props) {
  const [disabledBtn, setDisabledBtn] = useState(true)

  function completeTask(event){
    let parent = event.target.parentNode
    parent.style.opacity = 0.5;
    setDisabledBtn(!disabledBtn);
    changeState()
  }

  function backTask(event){
    let parent = event.target.parentNode
    parent.style.opacity = 1;
    setDisabledBtn(!disabledBtn);
  }

  function changeState(id){
    if(props.items.length){
      let itemData = [...props.items]
      itemData = itemData.filter(item => {
          if(+item.id !== +id){
            return item
          }
      })
      props.deleteHandler(itemData)
    }
  }

  async function deleteItem(event, url){
    let parent = event.target.parentNode;
    changeState(parent.id);
    const response = await axios.get(`${url}.json`)
    try{
      let deleteKey = ""
      let keys = Object.keys(response.data)
      keys.forEach(item => {
        if(+response.data[item].id === +parent.id){
           deleteKey = item
        }
      })
      const deleteResp = await axios.delete(`${url+deleteKey}.json`)
      alert('Задача удалена')
    } catch(e){
      console.error(e)
    }
  }

  return (
    
    <li style={{listStyle: 'none'}} className="card-body col-lg-4 mt-2 position-relative" id={props.id}>
      <h5 className="card-title">{props.header}</h5>
      <p className="card-text">{props.descr}</p>
      <p className="card-text"><small className="text-muted">Срок выполнения: {"не указан"}</small></p>
      <button className="btn btn-primary mr-2" onClick={completeTask} disabled={!disabledBtn}>Завершить</button>
      <button style={{backgroundColor: "red"}} className="btn btn-danger" onClick={backTask} disabled={disabledBtn}>Вернуться</button>
      <button type="button" className={`close ${classes.closeTodo}`} aria-label="Close" onClick={(event) => {deleteItem(event, url)}}>&times;</button>
    </li>
  )
}