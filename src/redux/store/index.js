import { createStore, combineReducers } from 'redux';

import TodosReducer from '../reducers/TodosReducer';
import TodoListReducer from '../reducers/TodoListReducer';


//create the store: the applications state
//combine Reducers 
const store = createStore(combineReducers({
    todos: TodosReducer,
    todoLists: TodoListReducer,
}))

export default store;