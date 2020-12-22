import React from 'react'


// Different context for payload

export const alerts = {

  succes: {
    type: 'alert-success',
    text: 'Задача успешно добавлена'
  },

  danger: {
    type: 'alert-danger',
    text: 'Что-то пошло не так'
  },

  regsuccess: {
    type: 'alert-success',
    text: 'Регистрация прошла успешно!'
  },

  regfailure: {
    type: 'alert-danger',
    text: 'Ошибка регистрации, попробуйте ещё раз!'
  },

  authsucces: {
    type: 'alert-success',
    text: 'Авторизация прошла успешно!'
  },

  authfailure: {
    type: 'alert-danger',
    text: 'Ошибка авторизации, попробуйте ещё раз!'
  },

  deleteSucces: {
    type: 'alert-success',
    text: 'Задача успешно удалена'
  },

  deleteFailure: {
    type: 'alert-warning',
    text: 'Не удалось удалить задачу проверьте подключение к сети'
  }


}

export const AlertContext = React.createContext();
