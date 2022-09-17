import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter,HashRouter} from 'react-router-dom'

import { Provider } from "react-redux";
import { store, persistor } from "./store/store.ts";
import {PersistGate} from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
            <HashRouter basename='/'>
                <App />
            </HashRouter>
        {/* </PersistGate> */}
    </Provider>
);
