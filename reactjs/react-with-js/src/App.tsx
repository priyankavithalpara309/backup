import React from 'react';
import './App.css';
import NewTodo from './components/NewTodo';
import Todo from './models/Todo';
import Todos from './components/Todo';
import { useState } from 'react';

function App() {
  // const todos = [new Todo('Learn react'), new Todo('Learn TypeScrpit')]

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) =>{
    const newTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) =>{   

    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.id !== todoId);
    });
  }

  return (
    <div>   
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} onRemoveTodo={removeTodoHandler} />      
    </div>
  );
}

export default App;
