import React,{useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'


export default function Currencies(){
    const [coinsData, setCoinsData] = useState([])

    useEffect(()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(data => setCoinsData(data))
    },[])

    const navigate = useNavigate()

    const currencies = coinsData.map((coin,index) => (
        <tr key={index} className='pointer' onClick={()=> navigate(`/currencies/${coin.id}`)} >
            <td>{coin.market_cap_rank}</td>
            <td className="flex gap-0 align-center">
                <img src={coin.image} className='small-img'/>
                <p>{coin.name}</p>
            </td>
            <td>{coin.current_price}</td>
            <td>{coin.price_change_percentage_24h.toFixed(2)}</td>
            <td>{coin.market_cap}</td>
        </tr>
    ))

    return(
        <div>
            <table className="container currencies-table">
                <thead>
                    <tr>
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