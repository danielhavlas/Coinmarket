import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter,HashRouter} from 'react-router-dom'
import {WatchlistContextProvider} from './context/WatchlistContext';    

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashRouter basename='/'>
            <App />
        </HashRouter>
    </Provider>
);
