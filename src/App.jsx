import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Stockpage from './components/Stockpage';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:ticker' element={<Stockpage/>} />
      </Routes>
    </div>
  );
}

export default App;
