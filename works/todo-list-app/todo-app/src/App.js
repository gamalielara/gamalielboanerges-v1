import Header from './Header';
import Aside from './Aside';
import ShowTodoList from './ShowTodoList';
import AddTodo from './addTodo';
import AddCategory from './addCategory';
import CategoryTodoList from './CategoryTodoList';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [categories, setCategories] = useState(['Tasks', 'Planned Tasks', 'Important Tasks']);
  const [todos, setTodo] = useState([]);
  const today = new Date().toString().split(' ').splice(0, 4).join(' ');
  
  const myDayTodos = (todos.filter((todo) => todo.deadline === today));
  const completedTodos = (todos.filter((todo) => todo.completed == true));

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="content">
          <div className="aside-content">
            <Aside categories={categories}/>
          </div>
          <div className="main-content">
              <h1>Welcome Back, Ara Gamaliel!</h1>
              <AddTodo categories={categories} todos={todos} addTodo={setTodo}/>
              <Switch>
                <Route exact path ='/'>
                  <ShowTodoList todos={todos} setTodos={setTodo} text='All Todos'/>
                </Route>
                <Route path='/myday'>
                  <ShowTodoList todos={myDayTodos} setTodos={setTodo} text={today}/>
                </Route>
                <Route path='/completed-todos'>
                  <ShowTodoList todos={completedTodos} setTodos={setTodo} text='Completed Todos'/>
                </Route>
                <Route path='/add-category'>
                  <AddCategory setCategories={setCategories} categories={categories}/>
                </Route>
                <Route path='/:category'>
                  <CategoryTodoList todos={todos} setTodos={setTodo}/>
                </Route>
              </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
