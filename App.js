import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store/index';

import ToDoApp from './src/ToDoApp';
export default class App extends React.Component {
  render() {
    return (
      //Provider allows the state known as a store to pass through all components
      <Provider store={store}>
        <ToDoApp />
      </Provider>)
  }
};