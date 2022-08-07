import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import CoinPage from './components/CoinPage';
import Header from './components/Header'
import Currencies from './components/Currencies';
import Portfolio from './components/Portfolio'
import MobileFooter from './components/MobileFooter'



function App() {
  // localStorage.clear()
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/currencies' element={<Currencies/>} />
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/currencies/:id' element={<CoinPage/>} />
      </Routes>
      <MobileFooter />
    </div>
  );
}

export default App;
