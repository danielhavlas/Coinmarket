import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter,HashRouter} from 'react-router-dom'
import {PortfolioContextProvider} from './context/PortfolioContext';    
import {WatchlistContextProvider} from './context/WatchlistContext';    
import { UserContext, UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter basename='/'>
            <PortfolioContextProvider>
                <WatchlistContextProvider>
                    <UserContextProvider>
                        <App />
                    </UserContextProvider>
                </WatchlistContextProvider>
            </PortfolioContextProvider>
    </HashRouter>
);
