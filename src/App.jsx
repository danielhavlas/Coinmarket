import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import Stockpage from './components/Stockpage';
import Header from './components/Header'


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/coins/:id' element={<Stockpage/>} />
      </Routes>
    </div>
  );
}

export default App;
