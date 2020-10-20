import React, { useState } from 'react';
import classes from './TodoItem.module.css'
import axios from 'axios'
import {ModalDialog} from '../../components/ModalDialog/ModalDialog'


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
    else{
      return null
    }
  }

  async function deleteItem(event){
    const id = Object.values({...event.target})[1].deleteid
    changeState(id);
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')
    const url = `https://react-todo-b0a36.firebaseio.com/${userId}/`;
    const response = await axios.get(`${url}.json?auth=${token}`)
    try{
      let deleteKey = ""
      let keys = Object.keys(response.data)
      keys.forEach(item => {
        if(+response.data[item].id === +id){
           deleteKey = item
        }
      })
      await axios.delete(`${url+deleteKey}.json?auth=${token}`)
      props.toggleAlertSuccess()
    } catch(e){
      console.error(e)
      props.toggleAlertFailure()
    }
  }

  return (
    <ModalDialog title="Подтвердите действие" description="Вы уверены что хотите удалить задачу?">
      {confirm => (
        <li style={{listStyle: 'none'}} className="card-body col-lg-4 mt-2 position-relative" id={props.id}>
        <h5 className="card-title">{props.header}</h5>
        <p className="card-text">{props.descr}</p>
        <p className="card-text"><small className="text-muted">Срок выполнения: {"не указан"}</small></p>
        <button className="btn btn-primary mr-2" onClick={completeTask} disabled={!disabledBtn}>Завершить</button>
        <button style={{backgroundColor: "red"}} className="btn btn-danger" onClick={backTask} disabled={disabledBtn}>Вернуться</button>
        <button type="button" className={`close ${classes.closeTodo}`} onClick={confirm((event) => {deleteItem(event)})} deleteid={props.id}>&times;</button>
       </li>
      )}
    </ModalDialog>
  )
}

