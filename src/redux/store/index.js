import { createStore, combineReducers } from 'redux';

import TodosReducer from '../reducers/TodosReducer';
import ListsReducer from '../reducers/ListsReducer';

//create the store: the applications state
//combine Reducers 
const store = createStore(combineReducers({
    todos: TodosReducer,
    lists: ListsReducer
}))

export default store;