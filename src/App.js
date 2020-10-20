import React, {useState} from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from './hoc/layout/layout'
import TodoNav from './containers/TodoNav/TodoNav'
import AddTodo from './containers/AddTodo/AddTodo'
import {TodoList} from './containers/TodoList/TodoList'
import {Auth} from './containers/Auth/Auth'
import {AlertContext ,alerts} from './context/AlertContext/AlertContext'
import {Logout} from './components/Logout/Logout'
import {About} from './containers/About/About'



function App() {

  const [token, setToken] = useState(null)

  function changeToken(){
    let token = localStorage.getItem('token')
    setToken({token: token})
  }

  let routes =  (
    <Switch>
      <Route path="/About" component={About}/>
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
        <Route path="/About" component={About}/>
        <Route path="/" render={(props) => (
        <Auth {...props} token={token} changeToken={changeToken}/>
        )}/>
       
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
