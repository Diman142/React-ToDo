/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './hoc/layout/layout'
import TodoNav from './containers/TodoNav/TodoNav'
import AddTodo from './containers/AddTodo/AddTodo'
import { TodoList } from './containers/TodoList/TodoList'
import { Auth } from './containers/Auth/Auth'
import { AlertContext, alerts } from './context/AlertContext/AlertContext'
import { Logout } from './components/Logout/Logout'
import { About } from './containers/About/About'

const tokenLinks = [
  { path: '/', title: 'Authentication', exact: true },
  { path: '/addToDo', title: 'Add-ToDo', exact: false },
  { path: '/TodoList', title: 'ToDo-List', exact: false },
  { path: '/About', title: 'About', exact: false },
]

const noTokenLinks = [
  { path: '/', title: 'Authentication', exact: true },
  { path: '/About', title: 'About', exact: false },
]

function App() {

  const [token, setToken] = useState(null)

  const [linksArr, setlinksArr] = useState(noTokenLinks)

  const [redir, setRedir] = useState(false)

  function changeToken() {
    // eslint-disable-next-line no-shadow
    const token = localStorage.getItem('token')
    setToken({ token })
    if (token) {
      setlinksArr([...tokenLinks])
      setRedir(false)
    } else {
      setlinksArr([...noTokenLinks])
      setRedir(true)
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    if (userToken && !token) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userPassword')
    }
  })

  let routes = (
    <Switch>
      {/* <Route path="/addToDo" component={AddTodo}/>
        <Route path="/TodoList" component={TodoList}/> */}
      <Route path="/About" component={About} />
      <Route
        path="/"
        render={(props) => (
          <Auth {...props} token={token} changeToken={changeToken} exact />
        )}
      />
    </Switch>
  )

  if ({ token }) {
    routes = (
      <Switch>
        <Route path="/addToDo" component={AddTodo} />
        <Route path="/TodoList" component={TodoList} />
        <Route path="/About" component={About} />
        <Route
          path="/"
          render={(props) => (
            <Auth {...props} token={token} changeToken={changeToken} />
          )}
        />
      </Switch>
    )

  }

  return (
    <AlertContext.Provider value={alerts}>
      <Layout>
        <BrowserRouter>
          <TodoNav token={token} links={linksArr} />
          {token ? <Logout changeToken={changeToken} redir={redir} /> : null}
          {routes}
        </BrowserRouter>
      </Layout>
    </AlertContext.Provider>
  );
}

export default App;
