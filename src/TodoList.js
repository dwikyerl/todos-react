/*global fetch*/
import React, {Component} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import * as apiCalls from './api';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todos: []
    }
    
    this.loadTodos = this.loadTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }
  
  componentWillMount() {
    this.loadTodos();
  }
  
  async addTodo(val){
    let newTodo = await apiCalls.createTodo(val);
    if (!newTodo.errors){
      this.setState({todos: [...this.state.todos, newTodo]});
    }
  }
  
  async loadTodos() {
    let todos = await apiCalls.getTodos();
    this.setState({todos});
  }
  
  async deleteTodo(id){
    await apiCalls.removeTodo(id);
    const todos = this.state.todos.filter(todo => todo._id !== id);
    this.setState({todos});
  }
  
  async toggleTodo(todo) {
    let updatedTodo = await apiCalls.updatedTodo(todo);
    const todos = this.state.todos.map(t => 
      (t._id === updatedTodo._id) 
      ? {...t, completed: !t.completed} 
      : t
    );
    this.setState({todos});
  }
  
  render() {
    const todos = this.state.todos.map((t) => (
      <TodoItem 
        key={t._id} 
        {...t}
        onDelete={this.deleteTodo.bind(this, t._id)}
        onToggle={this.toggleTodo.bind(this, t)}
      />
    ))
    return (
      <div className="TodoList">
        <header>
          <h1>todo<span>list</span></h1>
          <h2>A simple todo list app built with react</h2>
        </header>
        <TodoForm 
          onSubmit={this.addTodo}
        />
        <ul className="list">
          {todos}
        </ul>
      </div>
    )
  }
}

export default TodoList;