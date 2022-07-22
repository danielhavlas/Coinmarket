import React, { useState, useEffect} from 'react';
import Range from './components/range';
import PriceChart from './components/PriceChart';


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
    color: change24 >= 0? 'rgb(0, 231, 0)' : 'red'
  }

  useEffect(() => {
    async function getCoinData(){
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      const data = await res.json()
      const coinData = {
        price: data[0].current_price,
        priceChange: data[0].price_change_24h,
        percentChange: data[0].price_change_percentage_24h,
      }
      setCoinData(coinData)
    }
    
    getCoinData()
  },[])




  return (
    <div className="App">
      <div id="bitcoin">
        <h1 id="price">{coinData.price}</h1>
        <h4 id='currency'>USD</h4>
      </div>
      <h5 id='change' style={priceChangeStyle}>{`${coinData.priceChange} (${coinData.percentChange}%)`}</h5>
      <div id="tabs">
        {tabButtons}
      </div>
      <hr />
      <div id="chart-container">
          <div id="ranges">
            {rangeButtons}
          </div>
        <div >
          <PriceChart range={selectedRange} btcPrice={btcPrice}/>
        </div>
      </div>

      
    </div>
  );
}

