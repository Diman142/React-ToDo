import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Layout from './hoc/layout/layout'
import TodoNav from './containers/TodoNav/TodoNav'
import AddTodo from './containers/AddTodo/AddTodo'
import {TodoList} from './containers/TodoList/TodoList'


function App() {
  return (
    <Layout>
      <TodoNav/>
      <AddTodo/>
      <TodoList>
        
      </TodoList>
    </Layout>
  );
}

export default App;
