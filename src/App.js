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

const tokenLinks = [
  {path: '/', title: 'Authentication', exact: true},
  {path: '/addToDo', title: 'Add-ToDo', exact: false},
  {path: '/TodoList', title: 'ToDo-List', exact: false},
  {path: '/About', title: 'About', exact: false},
]

const noTokenLinks = [
  {path: '/', title: 'Authentication', exact: true},
  {path: '/About', title: 'About', exact: false},
]


function App() {

  const [token, setToken] = useState(null)

  const [linksArr, setlinksArr] = useState(noTokenLinks)

  const [redir, setRedir] = useState(false)

  function changeToken(){
    let token = localStorage.getItem('token')
    setToken({token: token})
    if(token){
      setlinksArr([...tokenLinks])
      setRedir(false)
    } else {
      setlinksArr([...noTokenLinks])
      setRedir(true)
    }
  }
  
  
  // let routes = (
  //   <Switch>
  //      <Route path="/addToDo" component={AddTodo}/>
  //      <Route path="/TodoList" component={TodoList}/>
  //      <Route path="/About" component={About}/>
  //      <Route path="/" render={(props) => (
  //      <Auth {...props} token={token} changeToken={changeToken}/>
  //      )}/>
  //   </Switch>
  // )

  // useEffect(() => {
    
  //   return function test(){
  //     if(token){
  //       routes = (
  //         <Switch>
  //           <Route path="/addToDo" component={AddTodo}/>
  //           <Route path="/TodoList" component={TodoList}/>
  //           <Route path="/About" component={About}/>
  //           <Route path="/" render={(props) => (
  //           <Auth {...props} token={token} changeToken={changeToken}/>
  //           )}/>
  //         </Switch>
  //       ) 
  //     } 
  //   }
  // }, [token])





  return (
    
    <AlertContext.Provider value={alerts}>
      <Layout>
        <BrowserRouter>
        <TodoNav token={token} links={linksArr}/>
        {token ? <Logout changeToken={changeToken} redir={redir}/> : null}
        <Switch>
            <Route path="/addToDo" component={AddTodo}/>
            <Route path="/TodoList" component={TodoList}/>
            <Route path="/About" component={About}/>
            <Route path="/" render={(props) => (
            <Auth {...props} token={token} changeToken={changeToken}/>
            )}/>
          </Switch>
        </BrowserRouter>
      </Layout>
    </AlertContext.Provider>
  );
}

export default App;
