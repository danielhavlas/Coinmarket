import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import CoinPage from './components/CoinPage';
import Header from './components/Header'
import Currencies from './components/Currencies';
import Portfolio from './components/Portfolio'
import MobileFooter from './components/MobileFooter'
import Searchbar from './components/Searchbar';

import {useMobileOnly} from './hooks/useMobileOnly'




function App() {
  // localStorage.clear()
  const [searchDisplay, setSearchDisplay] = useState('closed')
  const {mobileOnly} = useMobileOnly()
  const search = (
    <div className={`search search-${searchDisplay} flex`}>
      <button onClick={()=> setSearchDisplay('closed')}><i className="arrow ri-arrow-left-fill"></i></button>
      <div className="search-bar">
        <Searchbar  closeSearch={setSearchDisplay}/>
      </div>
    </div>
)
  return (
    <div className="App">
      {!mobileOnly && <Header className='large-only' />}
      {mobileOnly && search}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/currencies' element={<Currencies/>} />
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/currencies/:id' element={<CoinPage/>} />
      </Routes>
      {mobileOnly && <MobileFooter openSearch={setSearchDisplay} className='mobile-only' />}
    </div>
  );
}

export default App;
