import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import TodoListReducer from '../reducers/TodoListReducer';

//combine Reducers 
const rootReducer = combineReducers({
    todoLists: TodoListReducer,
})

//The middleware function thunk allows a redux store to make asynchronous AJAX requests
//actions muct be plain objects. middleware allows for async actions

//create the store: the applications state
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;