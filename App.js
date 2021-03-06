import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/redux/store/index';
import ToDoApp from './src/ToDoApp';

export default function App() {

    return (
        // PersistGate component delays the rendering of the app's UI until the persisted state is retrieved and saved to redux.
        // Provider allows the state known as a store to pass through all components
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToDoApp />
            </PersistGate>
        </Provider>
    );

}
