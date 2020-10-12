import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from './hoc/layout/layout'
import TodoNav from './containers/TodoNav/TodoNav'
import AddTodo from './containers/AddTodo/AddTodo'
import {TodoList} from './containers/TodoList/TodoList'
import {Auth} from './containers/Auth/Auth'


function App() {
  return (
    <Layout>
      <BrowserRouter>
      <TodoNav/>
        <Switch>
          <Route path="/addToDo" component={AddTodo}/>
          <Route path="/TodoList" component={TodoList}/>
          <Route path="/" component={Auth}/>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
