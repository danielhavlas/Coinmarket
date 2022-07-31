import React,{useState, useEffect, useContext} from "react";
import {useNavigate} from 'react-router-dom'

import { WatchlistContext } from '../WatchlistContext'


export default function Currencies(){
    const [coinsData, setCoinsData] = useState([])
    const { watchlist} = useContext(WatchlistContext)

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
        console.log(marketCap)
        return(
            <tr key={index} className='fs-5 pointer' onClick={()=>  navigate(`/currencies/${coin.id}`)}  >
                <td onClick={(e)=>{e.stopPropagation(); watchlist(coin)}}>*</td>
                <td>{coin.market_cap_rank}</td>
                <td className="flex gap-0 align-center">
                    <img src={coin.image} className='small-img'/>
                    <p>{coin.name}</p>
                </td>
                <td>${coin.current_price}</td>
                <td style={priceChangeStyle}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                <td>${marketCap}</td>
            </tr>
        )
    })

    return(
        <div>
            <table className="container currencies-table">
                <thead>
                    <tr className="fs-4">
                        <th></th>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24%</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies}
                </tbody>
            </table>
        </div>
    )
}