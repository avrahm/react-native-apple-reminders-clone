import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

//https://react-native-async-storage.github.io/async-storage/docs/install/
//https://blog.jscrambler.com/how-to-use-redux-persist-in-react-native-with-asyncstorage/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import TodoListReducer from '../reducers/TodoListReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['todoLists']
}

//combine Reducers 
const rootReducer = combineReducers({
    todoLists: persistReducer(persistConfig, TodoListReducer),
})

//The middleware function thunk allows a redux store to make asynchronous AJAX requests
//actions muct be plain objects. middleware allows for async actions

//create the store: the applications state
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store); 
