import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './App.css';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase.utils";

import Home from './components/Home'
import CoinPage from './components/CoinPage';
import Header from './components/Header'
import Currencies from './components/Currencies';
import Portfolio from './components/Portfolio'
import MobileFooter from './components/MobileFooter'
import Searchbar from './components/Searchbar';

import { setCurrentUser } from "./store/user/user.action";
import { updatePortfolio } from "./store/portfolio/portfolio.action";
import { selectorPortfolio } from "./store/portfolio/portfolio.selector";

import {useMobileOnly} from './hooks/useMobileOnly'
import Authentication from './components/Authentication';




function App() {
  // localStorage.clear()
  const dispatch = useDispatch()
  const portfolio = useSelector(selectorPortfolio)

  useEffect(()=>{
    
    // portfolio.portfolioArray.forEach(asset => {
    //   fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    //   .then(res => res.json())
    //   .then(data => {
    //     const newPortfolio = () => {
    //       return portfolio.portfolioArray.map(v => {
    //           if(v.id === asset.id){
    //               return {...v,coinData: data [0], value: data[0].current_price * v.amount}
    //           }else {
    //               return {...v}
    //           }
    //       })
    //     }
    //       dispatch(updatePortfolio(newPortfolio,portfolio.usdBalance))
    //     })
    // })

    const unsubscribe = onAuthStateChangedListener((user)=>{
      if(user){
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user))
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
        <Route path='/' element={<Home />}/>
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
