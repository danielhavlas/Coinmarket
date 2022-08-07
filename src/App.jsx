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




function App() {
  // localStorage.clear()
  const [searchDisplay, setSearchDisplay] = useState('closed')
  const search = (
    <div className={`search search-${searchDisplay} flex`}>
      <button onClick={()=> setSearchDisplay('closed')}>{'<-'}</button>
      <div className="search-bar">
        <Searchbar  closeSearch={setSearchDisplay}/>
      </div>
    </div>
)
  return (
    <div className="App">
      <Header />
      {search}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/currencies' element={<Currencies/>} />
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/currencies/:id' element={<CoinPage/>} />
      </Routes>
      <MobileFooter openSearch={setSearchDisplay} />
    </div>
  );
}

export default App;
