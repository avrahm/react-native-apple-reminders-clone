import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

//https://react-native-async-storage.github.io/async-storage/docs/install/
//https://blog.jscrambler.com/how-to-use-redux-persist-in-react-native-with-asyncstorage/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import userReducer from '../reducers/UserReducer';
import todoReducer from '../reducers/TodoListReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userInfo']
}

//combine Reducers 
const rootReducer = combineReducers({
    todoState: todoReducer,
    userState: userReducer
})

const pReducer = persistReducer(persistConfig, rootReducer);

//The middleware function thunk allows a redux store to make asynchronous AJAX requests
//actions muct be plain objects. middleware allows for async actions

//create the store: the applications state
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store); 
