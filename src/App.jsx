import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import Stockpage from './components/Stockpage';
import Header from './components/Header'
import Searchbar from './components/Searchbar';


function App() {

  return (
    <div className="App">
      <Searchbar/>
      <Link to='/'>HOME</Link>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/coins/:id' element={<Stockpage/>} />
      </Routes>
    </div>
  );
}

export default App;
