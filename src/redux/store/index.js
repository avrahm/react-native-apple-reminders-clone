import { createStore, combineReducers } from 'redux';

import TodosReducer from '../reducers/TodosReducer'

//create the store: the applications state
//combine Reducers 
const store = createStore(combineReducers({
    todos: TodosReducer
}))

export default store;