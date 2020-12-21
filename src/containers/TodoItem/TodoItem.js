/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios'
import { ModalDialog } from '../../components/ModalDialog/ModalDialog'
import classes from './TodoItem.module.css'


export function TodoItem(props) {

  const [disabledBtn, setDisabledBtn] = useState(true)

  const [deadlineDay, setDeadlineDay] = useState(null)
  const [deadlineHour, setDeadlineHour] = useState(null)
  const [deadlineMinutes, setDeadlineMinutes] = useState(null)
  const [deadlineSeconds, setDeadlineSeconds] = useState(null)
  const [timerFlag, setTimerFlag] = useState(true)



  function backTask(event) {
    const parent = event.target.parentNode
    parent.style.opacity = 1;
    setDisabledBtn(!disabledBtn);
  }

  function changeState(id) {
    if (props.items.length) {
      let itemData = [...props.items]
      // eslint-disable-next-line array-callback-return
      itemData = itemData.filter(item => {
        if (+item.id !== +id) {
          return item
        }
      })
      props.deleteHandler(itemData)
    }
    else {
      return null
    }
  }

  function completeTask(event) {
    console.log(props)
    const parent = event.target.parentNode
    parent.style.opacity = 0.5;
    setDisabledBtn(!disabledBtn);
    changeState()
  }

  function getDateComponent(deadline) {
    const days = Math.floor(deadline / (1000 * 60 * 60 * 24))
    const hours = Math.floor((deadline / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((deadline / 1000 / 60) % 60)
    const seconds = Math.floor((deadline / 1000) % 60)

    return {
      days, hours, minutes, seconds
    }

  }

  function getDeadline(date, time) {
    const dateElems = date.split('-')
    const timeElems = time.split(':')
    const deadline = new Date(dateElems[2], dateElems[1] - 1, dateElems[0], timeElems[0], timeElems[1]);
    let delay = 5;

    const deadlineTimer = setInterval(() => {
      const endTime = deadline - new Date()
      if (endTime <= 0) {
        setTimerFlag(false)
        clearInterval(deadlineTimer)
      } else {
        setTimerFlag(true)

        const timeComponent = getDateComponent(endTime)

        setDeadlineDay(timeComponent.days)
        setDeadlineHour(timeComponent.hours)
        setDeadlineMinutes(timeComponent.minutes)
        setDeadlineSeconds(timeComponent.seconds)
      }
      delay = 1000
    }, delay)

  }

  async function deleteItem(event) {
    const id = Object.values({ ...event.target })[1].deleteid
    changeState(id);
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const url = `https://react-todo-b0a36.firebaseio.com/${userId}/`;
    const response = await axios.get(`${url}.json?auth=${token}`)
    try {
      let deleteKey = ""
      const keys = Object.keys(response.data)
      keys.forEach(item => {
        if (+response.data[item].id === +id) {
          deleteKey = item
        }
      })
      await axios.delete(`${url + deleteKey}.json?auth=${token}`)
      props.toggleAlertSuccess()
    } catch (e) {
      console.error(e)
      props.toggleAlertFailure()
    }
  }

  getDeadline(props.deadlineDate, props.deadlineTime)

  return (
    <ModalDialog title="Подтвердите действие" description="Вы уверены что хотите удалить задачу?">
      {confirm => (
        <li style={{ listStyle: 'none' }} className="card-body col-lg-4 mt-2 position-relative" id={props.id}>
          <h5 className="card-title">{props.header}</h5>
          <p className="card-text">{props.descr}</p>
          <p className="card-text">
            <small className="text-muted">
              {timerFlag ? `До дедлайна: ${deadlineDay} дней ${deadlineHour} ч. ${deadlineMinutes} мин. ${deadlineSeconds} сек.` : 'Срок выполнения задачи истёк'}
            </small>
          </p>
          <button type="button" className="btn btn-primary mr-2" onClick={completeTask} disabled={!disabledBtn}>Завершить</button>
          <button type="button" style={{ backgroundColor: "red" }} className="btn btn-danger" onClick={backTask} disabled={disabledBtn}>Вернуться</button>
          <button type="button" className={`close ${classes.closeTodo}`} onClick={confirm((event) => { deleteItem(event) })} deleteid={props.id}>&times;</button>
        </li>
      )}
    </ModalDialog>
  )
}

