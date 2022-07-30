import React,{useState, useEffect} from "react";

export default function Currencies(){
    const [coinsData, setCoinsData] = useState([])

    useEffect(()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(data => setCoinsData(data))
    },[])

    const currencies = coinsData.map((coin,index) => (
        <div key={index} className="flex">
            <h3>{coin.name}</h3>
            <h3>{coin.current_price}</h3>
        </div>
    ))

    return(
        <div>
            {currencies}
        </div>
    )
}