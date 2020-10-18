import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from './hoc/layout/layout'
import TodoNav from './containers/TodoNav/TodoNav'
import AddTodo from './containers/AddTodo/AddTodo'
import {TodoList} from './containers/TodoList/TodoList'
import {Auth} from './containers/Auth/Auth'
import {AlertContext ,alerts} from './context/AlertContext/AlertContext'
import {Logout} from './components/Logout/Logout'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))

  function changeToken(){
    let token = localStorage.getItem('token')
    setToken({token: token})
  }


  let routes =  (
    <Switch>
      <Route path="/" render={(props) => (
        <Auth {...props} token={token} changeToken={changeToken}/>
      )} />
    </Switch>
  )

  if(token){
    routes = (
      <Switch>
        <Route path="/addToDo" component={AddTodo}/>
        <Route path="/TodoList" component={TodoList}/>
        <Route path="/" render={(props) => (
        <Auth {...props} token={token} changeToken={changeToken}/>
        )} />
      </Switch>
    )
  }

  return (
    
    <AlertContext.Provider value={alerts}>
      <Layout>
        <BrowserRouter>
        <TodoNav token={token}/>
        {token ? <Logout/> : null}
        {routes}
        </BrowserRouter>
      </Layout>
    </AlertContext.Provider>
  );
}

export default App;
