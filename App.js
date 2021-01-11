import React from 'react';
// import ToDoScreen from './src/Screens/ToDoScreen'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import update from 'immutability-helper'; //https://reactjs.org/docs/update.html
import ToDoApp from './src/ToDoApp';

//create the initial state of the app
const initialState = {
  todoId: 7,
  todos: [
    { id: 1, title: "Todo 1", complete: false },
    { id: 2, title: "Todo 2", complete: false },
    { id: 3, title: "Todo 3", complete: false },
    { id: 4, title: "Todo 4", complete: false },
    { id: 5, title: "Todo 5", complete: true },
    { id: 6, title: "Todo 6", complete: true }
  ],
  user: {
    id: 1,
    username: 'Test'
  }
}

//reducer handles the actions sent by dispatchers to modify and return the state
const reducer = (state = initialState, action) => {

  console.log(state);
  let index;
  let newState;
  
  switch (action.type) {
    case 'ADD_TODO':
      let newTodo = {
        id: state.todoId++,
        title: action.payload,
        complete: false
      }

      return {
        ...state,
        todos: [...state.todos, newTodo]
      }
    case 'DELETE_TODO':

      // findIndex takes a callback function to execute on each array until the function returns true
      //returns The index of the first element in the array that passes the test. Otherwise, -1.
      //for my use case I'm iterating over all the todos and if the todo.id equals the payload return the index
      index = state.todos.findIndex((todo) => todo.id == action.payload.id);

      //immutability helper allows to create copies of the state and mutate the data with the update() method
      //The $-prefixed keys are called commands. The data structure they are “mutating” is called the target.
      const newTodos = update(state, { todos: { $splice: [[index, 1]] } })

      return {
        ...state,
        ...newTodos
      }

    case 'COMPLETE_TODO':
      index = state.todos.findIndex((todo) => todo.id == action.payload.id);

      newState = update(state, {
        todos: {
          [index]: {
            complete: { $set: true }
          }
        }
      });

      return {
        ...newState,
      }
    case 'MARK_PENDING_TODO':
      index = state.todos.findIndex((todo) => todo.id == action.payload.id);

      newState = update(state, {
        todos: {
          [index]: {
            complete: { $set: false }
          }
        }
      });

      return {
        ...newState,
      }
  }
  return state;
}

//create the store: the applications state
const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      //Provider allows the state known as a store to pass through all components
      <Provider store={store}>
        <ToDoApp />
      </Provider>)
  }
};