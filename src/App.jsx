import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import CoinPage from './components/CoinPage';
import Header from './components/Header'


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/currencies/:id' element={<CoinPage/>} />
      </Routes>
    </div>
  );
}

export default App;
