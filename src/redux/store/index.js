import { createStore, combineReducers } from 'redux';

import TodoListReducer from '../reducers/TodoListReducer';


//create the store: the applications state
//combine Reducers 
const store = createStore(combineReducers({
    todoLists: TodoListReducer,
}))

export default store;