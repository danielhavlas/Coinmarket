import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './App.css';

import { onAuthStateChangedListener, createUserDocumentFromAuth, getDocument, updateDocument } from "./utils/firebase.utils";

import Home from './components/Home'
import CoinPage from './components/CoinPage';
import Header from './components/Header'
import Currencies from './components/Currencies';
import Portfolio from './components/Portfolio'
import MobileFooter from './components/MobileFooter'
import Searchbar from './components/Searchbar';
import Landing from './components/Landing'


import { setCurrentUser } from "./store/user/user.action";
import { fetchPortfolioStart } from "./store/portfolio/portfolio.action";
import { updateWatchlist } from './store/watchlist/watchlist.action';
import { selectorCurrentUser } from "./store/user/user.selector";
import { selectorWatchlist } from "./store/watchlist/watchlist.selector";

import {useMobileOnly} from './hooks/useMobileOnly'
import Authentication from './components/Authentication';





function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectorCurrentUser)
  const {watchlistArray} = useSelector(selectorWatchlist)

  const navigate = useNavigate()

  useEffect(()=>{
    if(currentUser){
      dispatch(fetchPortfolioStart())
    }
  },[currentUser])
  useEffect(()=>{
    async function updatePrices(){
      watchlistArray.forEach(v => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${v.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(data => {
          const newWatchlistArray = watchlistArray.map(i => {
            return i.id === v.id? data[0] : i
          })
          dispatch(updateWatchlist(newWatchlistArray))
        })
      })
    }
    
    updatePrices()

    const unsubscribe = onAuthStateChangedListener((user)=>{
      if(user){
        createUserDocumentFromAuth(user)
        dispatch(setCurrentUser(user))
        navigate('')
      }
    })  
    
    return unsubscribe 
    
  },[])

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
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home />}/>
        <Route path='/currencies' element={<Currencies/>} />
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/currencies/:id' element={<CoinPage/>} />
        <Route path='/auth' element={<Authentication/>} />
      </Routes>
      {mobileOnly && <MobileFooter openSearch={setSearchDisplay} className='mobile-only' />}
    </div>
  );
}

export default App;
