import React, { useState, useEffect, useContext} from 'react';
import Range from './Range';
import PriceChart from './PriceChart';
import {useParams} from 'react-router-dom'
import { PortfolioContext } from '../context/PortfolioContext'
import { WatchlistContext } from '../context/WatchlistContext'
import OrderPopup from './OrderPopup';
import { useMobileOnly } from '../hooks/useMobileOnly';




export default function Stockpage() {

  const [selectedRange, setSelectedRange] = useState(0)
  const [selectedTab, setSelectedTab] = useState(1)
  const [coinData, setCoinData] = useState({})
  const [buyAmount, setBuyAmount] = useState(0)
  const {id} = useParams()
  const {order, usdBalance} = useContext(PortfolioContext)
  const { watchlist, isWatchlist} = useContext(WatchlistContext)
  const [displayOrder, setDisplayOrder] = useState('closed')
  const [tradeStatus, setTradeStatus] = useState('')
  const {mobileOnly} = useMobileOnly()

  
  useEffect(() => {
    async function getCoinData(){
      try{
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false`)
        const data = await res.json()
        console.log('fetched coinpage');
        setCoinData(data[0])
      }
      catch(err){
        console.log(err)
      }
    }
    
    getCoinData()
  },[id])
  const ranges = ['1d','3d','1w','1m','6m','1y','max']
  const rangeButtons = ranges.map((range,index) => {
    return(
      <Range selected={selectedRange} range={range} key={index} index={index} selectRange={selectRange} />
    )
  })

  function selectRange(index){
    setSelectedRange(index)
  }
  function selectTab(index){
    setSelectedTab(index)
  }

  const tabs = ['Summary', 'Chart','Statistics', 'Analysis','Settings ']
  const tabButtons = tabs.map((tab,index) => {
    const style = {
      borderBottom: selectedTab===index? 'solid 3px #4B40EE' : 'solid 3px transparent'
    }

    return(
      <button className='tab fs-5' style={style} onClick={() => selectTab(index)} key={index}>{tab}</button>
    )
  })

  const priceChangeStyle = {
    color: coinData.price_change_24h >= 0? 'rgb(0, 231, 0)' : 'red'
  }

  function changeBuyAmount(action,e,i){
    if(action==='minus' && buyAmount !== 0){
      setBuyAmount(prevBuyAmount => prevBuyAmount - 1 )
    }
    else if(action==='plus'){
      setBuyAmount(prevBuyAmount => prevBuyAmount + 1 )
    }
    else if(action ==='type'){
      setBuyAmount(prevBuyAmount =>{
          return Number(String(prevBuyAmount) + i) 
      } )
    }
    else if(action === 'backspace'){
      setBuyAmount(prevBuyAmount =>{
          if(String(prevBuyAmount).slice(0,-1).length === 0){
              return 0
          }else{
              return Number(String(prevBuyAmount).slice(0,-1)) 
          }
      })
    }
    else if(action==='set' && !isNaN(e)){
      setBuyAmount(Number(e))
    }
  }

  
  function buy(){
    const minBuyPrice = 10
    if(buyAmount*coinData.current_price > minBuyPrice){
      if(usdBalance >= buyAmount*coinData.current_price){
        order('buy',id,coinData,buyAmount,buyAmount*coinData.current_price)
        setDisplayOrder('closed')
        setTradeStatus('finished')
        setTimeout(() => {
          setTradeStatus('')
        }, 2000);
      }
      else{
        alert('brokey')
      }
    }
  }
  
  
  if(coinData.id === undefined){
    return ''
  }
  const iconClass = isWatchlist(coinData)? "ri-star-fill" :"ri-star-line"

  const buyField = (
    <div className={`order-container order-${displayOrder} card bg-black`}>
          <button onClick={() => setDisplayOrder('closed')} className="text-white fs-3"><i className="fs-1 ri-close-line"></i></button>
      <div className="flex-vert gap-0">
        {!mobileOnly &&<div className="input-container flex gap-0">
          <button className='count-button fs-3 text-white bg-blue' onClick={()=> changeBuyAmount('minus')}>-</button>
          <input className='count-input fs-5' value={buyAmount} onChange={(e) => changeBuyAmount('set',e.target.value)} type='text'/>
          <button className='count-button fs-3 text-white bg-blue' onClick={()=> changeBuyAmount('plus')}>+</button>
        </div>}
        <p className='order bg-blue text-white fs-3'>${(buyAmount * coinData.current_price).toFixed(2)}</p>
        {mobileOnly && <div>
              <p className='order bg-blue text-white fs-3 uppercase'>{buyAmount} {coinData.symbol}</p>
              <div className="grid number-grid">
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'1')}>1</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'2')}>2</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'3')}>3</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'4')}>4</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'5')}>5</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'6')}>6</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'7')}>7</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'8')}>8</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'9')}>9</button>
                  <button className="bg-black"></button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('type',1,'0')}>0</button>
                  <button className="text-white fs-2" onClick={() => changeBuyAmount('backspace')}><i className="ri-arrow-left-fill"></i></button>

              </div>
            </div>}
        <button className='order bg-blue text-white fs-3' onClick={buy}>Buy</button>
      </div>

    </div>
  )

  return (
    <div className={`container flex ${mobileOnly? '':'gap-2'} `}>
      <div className="card bg-white coin-page">
        <div className='flex gap-1 coin-page-header'>
          <img className='large-img' src={coinData.image} alt="" />
          <div className=''>
            <h1 className='name fs-1'>{coinData.name}</h1>
            <div className="flex gap-1">
              <div className="flex align-baseline ">
                <h2 className='fs-2'>{coinData.current_price}</h2>
                <h4 className='text-grey fs-5'>USD</h4>
              </div>
              <h5 className='change fs-4' style={priceChangeStyle}>{`${coinData.price_change_24h.toFixed(2)} (${coinData.price_change_percentage_24h.toFixed(2)}%)`}</h5>
              <button className='fs-5 text-blue' onClick={() => watchlist(coinData)}><i className={`star-icon ${iconClass}`}></i></button>
              {!mobileOnly && <button className="text-white fs-3 bg-blue buy-button" onClick={() => setDisplayOrder('open')}>Buy</button>}
            </div>
          </div>

        </div>
       {!mobileOnly && <div className="tabs">
          {tabButtons}
        </div>}
        <hr />
        <div className="align-center">
          <div className='chart-ranges flex-vert' >
            <div className="flex space-between align-center">
              {!mobileOnly && <div className='flex gap-1'>
                <div className=' fs-4flex align-center' > 
                  <i className="text-black ri-fullscreen-line"></i>
                  <button className='function'>Fullscreen</button>
                </div>
                <div className='fs-4 flex align-center'>
                  <i className="text-black ri-add-circle-line"></i>
                  <button className='function'>Compare</button>
                </div>
              </div>}
              <div className="ranges">
                {rangeButtons}
              </div>
            </div>
            <PriceChart className='coin-page-chart' id={id} range={selectedRange} large={true}/>
          </div>
        </div>
        {mobileOnly && <button className="text-white bg-blue buy-button" onClick={() => setDisplayOrder('open')}>Buy</button>}
      </div>
      <div className="overflow-wrapper">
        {buyField}
      </div>
      <OrderPopup 
        status={tradeStatus} 
        traded={'bought'} 
        amount={buyAmount} 
        currency={coinData.symbol} 
        price={(coinData.current_price * buyAmount)
      }/>
    </div>
  );
}

