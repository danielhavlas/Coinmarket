import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {PortfolioContextProvider} from './context/PortfolioContext';    
import {WatchlistContextProvider} from './context/WatchlistContext';    

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <PortfolioContextProvider>
            <WatchlistContextProvider>
                <App />
            </WatchlistContextProvider>
        </PortfolioContextProvider>
    </BrowserRouter>
);
