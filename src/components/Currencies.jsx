import React,{useState, useEffect, useContext} from "react";
import {useNavigate} from 'react-router-dom'

import { WatchlistContext } from '../context/WatchlistContext'

import PriceChart from "./PriceChart";


export default function Currencies(){
    const [coinsData, setCoinsData] = useState([])
    const { watchlist, isWatchlist} = useContext(WatchlistContext)

    useEffect(()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(data => setCoinsData(data))
    },[])

    const navigate = useNavigate()

    const currencies = coinsData.map((coin,index) =>{ 
        const priceChangeStyle = {
            color: coin.price_change_24h >= 0? 'rgb(0, 231, 0)' : 'red'
        }
        const marketCap = coin.market_cap.toString().split('').reverse().map((v,i,a) => i%3===0 && i !== 0 ?v+',': v).reverse().join('')
        const green = coin.price_change_24h >= 0
        const iconClass = isWatchlist(coin)? "ri-star-fill" :"ri-star-line"
        return(
            <tr key={index} className='fs-5 pointer' onClick={()=>  navigate(`/currencies/${coin.id}`)}  >
                <td className="large-only fs-1" onClick={(e)=>{e.stopPropagation(); watchlist(coin)}}><i className={`star-icon ${iconClass}`}></i></td>
                <td className="large-only">{coin.market_cap_rank}</td>
                <td className="flex fw-600 gap-0 align-center">
                    <img src={coin.image} className='small-img'/>
                    <div>
                        <p>{coin.name}</p>
                        <p className="fs-5 text-grey uppercase">{coin.symbol}</p>
                    </div>
                </td>
                <td><PriceChart id={coin.id} range={0} large={false} green={green} /></td>
                <td className="text-left">
                    <div>
                        <p>${coin.current_price}</p>
                        <p style={priceChangeStyle}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                </td>
                <td className="large-only">${marketCap}</td>
            </tr>
        )
    })

    return(
        <div className="container">
            <table className=" card bg-white table">
                <thead className="">
                    <tr className="fs-5 text-grey">
                        <th className="large-only"></th>
                        <th className="large-only">#</th>
                        <th>Name</th>
                        <th></th>
                        <th className="text-left">Price</th>
                        <th className="large-only">24%</th>
                        <th className="large-only">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies}
                </tbody>
            </table>
        </div>
    )
}