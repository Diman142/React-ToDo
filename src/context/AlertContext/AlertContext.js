import React from 'react'

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
}

export const AlertContext = React.createContext();