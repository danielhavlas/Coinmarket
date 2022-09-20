import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './App.css';

import { User } from 'firebase/auth'
import { onAuthStateChangedListener, createUserDocumentFromAuth, getDocument, updateDocument } from "./utils/firebase.utils.ts";
import { fetchData} from './utils/fetchData.utils.ts'

import Home from './components/Home.tsx'
import CoinPage from './components/CoinPage.tsx';
import Header from './components/Header.tsx'
import Currencies from './components/Currencies.tsx';
import Portfolio from './components/Portfolio.tsx'
import MobileFooter from './components/MobileFooter.tsx'
import Searchbar from './components/Searchbar.tsx';
import Landing from './components/Landing.tsx'
import Authentication from './components/Authentication.tsx';


import { setCurrentUser } from "./store/user/user.action.ts";
import { fetchPortfolioStart } from "./store/portfolio/portfolio.action.ts";
import { updateWatchlist } from './store/watchlist/watchlist.action.ts';
import { selectorCurrentUser } from "./store/user/user.selector.ts";
import { selectorWatchlist } from "./store/watchlist/watchlist.selector.ts";

import {useMobileOnly} from './hooks/useMobileOnly.tsx'

interface ICoinData {
  price_change_24h:number,
  image: string,
  current_price: number,
  id: number,
  name: string,
  symbol: string
}
interface IAsset {
  coinData: ICoinData,
  amount: number,
  value: number,
}

interface IPortfolio {
  portfolioArray: IAsset[],
  usdBalance: number,
}


function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectorCurrentUser)
  const watchlistArray: ICoinData[] = useSelector(selectorWatchlist)

  const location = useLocation()

  useEffect(()=>{
    if(currentUser){
      dispatch(fetchPortfolioStart())
    }
  },[currentUser])
  useEffect(()=>{
    
    async function updatePrices(){
      const newWatchlistArray: Promise<IAsset[]> = Promise.all(watchlistArray.map( async asset => {
        const data = await fetchData<ICoinData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        return data[0]
      }))
      dispatch(updateWatchlist(await newWatchlistArray))
    }
    
    updatePrices()

    const unsubscribe = onAuthStateChangedListener((user: User)=>{
      if(user){
        createUserDocumentFromAuth(user)
        dispatch(setCurrentUser(user))
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
        <Searchbar closeSearch={setSearchDisplay}/>
      </div>
    </div>
  )

  return (
    <div className="App">
      {!mobileOnly && location.pathname !== '/' && <Header className='large-only' />}
      {mobileOnly && search}
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={!currentUser? <Navigate to='/auth' replace /> : <Home />}/>
        <Route path='/currencies' element={!currentUser? <Navigate to='/auth' replace /> : <Currencies/>} />
        <Route path='/portfolio' element={!currentUser? <Navigate to='/auth' replace /> : <Portfolio/>}/>
        <Route path='/currencies/:id' element={!currentUser? <Navigate to='/auth' replace /> : <CoinPage/>} />
        <Route path='/auth' element={currentUser? <Navigate to='/home' replace/> : <Authentication/>} />
      </Routes>
      {mobileOnly && location.pathname !== '/' && <MobileFooter openSearch={setSearchDisplay} className='mobile-only' />}
    </div>
  );
}

export default App;
