import React from 'react';
import ToDoScreen from './src/Screens/ToDoScreen'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

//create the initial state of the app
const initialState = {
  todos: ["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"],
  showAddTodoForm: false,
}

//reducer handles the actions sent by dispatchers to modify and return the state
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { 
        ...state, 
        todos: [...state.todos, action.payload] 
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
}

