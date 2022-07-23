import React, { useState, useEffect} from 'react';
import Range from './Range';
import PriceChart from './PriceChart';


export default function Stockpage() {

const [selectedRange, setSelectedRange] = useState(0)
const [selectedTab, setSelectedTab] = useState(1)
const [coinData, setCoinData] = useState({})



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
      borderBottom: selectedTab===index? 'solid 3px #4B40EE' : ''
    }

    return(
      <button className='tab' style={style} onClick={() => selectTab(index)} key={index}>{tab}</button>
    )
  })

  const priceChangeStyle = {
    color: coinData.price_change_24h >= 0? 'rgb(0, 231, 0)' : 'red'
  }

  useEffect(() => {
    async function getCoinData(){
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      const data = await res.json()
      setCoinData(data[0])
    }
    
    getCoinData()
  },[])




  return (
    <div className="coin-page">
      <div className='heading'>
        <h1 className='name'>{coinData.name}</h1>
        <div className="flex">
          <h2 className="price">{coinData.current_price}</h2>
          <h4 className='currency'>USD</h4>
        </div>
      </div>
      <h5 className='change' style={priceChangeStyle}>{`${coinData.price_change_24h.toFixed(2)} (${coinData.price_change_percentage_24h.toFixed(2)}%)`}</h5>
      {/* <div className="tabs">
        {tabButtons}
      </div> */}
      <hr />
      <div>
          <div className="ranges">
            {rangeButtons}
          </div>
        <div >
          <PriceChart range={selectedRange}/>
        </div>
      </div>

      
    </div>
  );
}

