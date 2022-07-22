<<<<<<< Updated upstream
import { useEffect, useState } from "react"
=======
import React, { useState, useEffect} from 'react';
import Range from './range';
import PriceChart from './PriceChart';
>>>>>>> Stashed changes

export default function Stockpage(props){



    useEffect(() =>{
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`)
    },[])
    return(
        <div>

<<<<<<< Updated upstream
        </div>
    )
}
=======
  const priceChangeStyle = {
    color: coinData.priceChange >= 0? 'rgb(0, 231, 0)' : 'red'
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
    <div className="coin-page">
      <div className="heading">
        <h1 class="price">{coinData.price}</h1>
        <h4 class='currency'>USD</h4>
      </div>
      <h5 class='change' style={priceChangeStyle}>{`${coinData.priceChange} (${coinData.percentChange}%)`}</h5>
      <div class="tabs">
        {tabButtons}
      </div>
      <hr />
      <div class="chart-container">
        <div class="ranges">
            {rangeButtons}
        </div>
        <div>
          <PriceChart range={selectedRange}/>
        </div>
      </div>
    </div>
  );
}

>>>>>>> Stashed changes
