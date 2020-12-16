import React from 'react';
import ToDoScreen from './src/Screens/ToDoScreen'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import update from 'immutability-helper';
import { act } from 'react-test-renderer';

//create the initial state of the app
const initialState = {
  todoId: 6,
  todos: [{ id: 1, title: "Todo 1" }, { id: 2, title: "Todo 2" }, { id: 3, title: "Todo 3" }, { id: 4, title: "Todo 4" }, { id: 5, title: "Todo 5" }],
  user: {
    id: 1,
    username: 'Test'
  }
}

//reducer handles the actions sent by dispatchers to modify and return the state
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      let newTodo = {
        id: state.todoId++,
        title: action.payload,
      }

      // console.log(state);
      return {
        ...state,
        todos: [...state.todos, newTodo]
      }
    case 'DELETE_TODO':

      // const findIndex = (todo) => todo.id == action.payload;
      const index = state.todos.findIndex((todo) => todo.id == action.payload);
      const newTodos = update(state, { todos: { $splice: [[index, 1]] } })
      return {
        ...state,
        ...newTodos
      }
  }
  return state;
}

//create the store: the applications state
const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      //Provider passes allow the state known as store to pass through all our components
      <Provider store={store}>
        <ToDoScreen />
      </Provider>)
  }
};