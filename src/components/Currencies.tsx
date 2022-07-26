import React,{useState, useEffect, useContext, Suspense} from "react";
import {useNavigate} from 'react-router-dom'
import { watchlist, isWatchlist } from "../store/watchlist/watchlist.action.ts";
import { selectorWatchlist } from '../store/watchlist/watchlist.selector.ts';
import { useMobileOnly } from "../hooks/useMobileOnly.tsx";
import { useSelector,useDispatch } from "react-redux";
import PriceChart from "./PriceChart.tsx";
import { fetchData } from "../utils/fetchData.utils.ts";

interface ICoinData {
    price_change_24h: number,
    image: string,
    current_price: number,
    id: number,
    name: string,
    symbol: string,
    market_cap: number,
    market_cap_rank: number,
    price_change_percentage_24h: number
}
interface IWatchlist {
    watchlistArray: ICoinData[]
}


export default function Currencies(){

    const watchlistArray: IWatchlist  =  useSelector(selectorWatchlist)
    const dispatch = useDispatch()

    const [coinsData, setCoinsData] = useState<ICoinData[]>([])
    const {mobileOnly} = useMobileOnly()
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

    useEffect(()=> {
            const getData = async () => {
                const data = await fetchData<ICoinData[]>(url)
                setCoinsData(data)
            }
            getData()
    },[])

    const navigate = useNavigate()

    const currencies = coinsData?.map((coin,index) =>{ 
        const iconClass = isWatchlist(coin,watchlistArray)? "ri-star-fill" :"ri-star-line"
        const priceChangeStyle = {
            color: coin.price_change_24h >= 0? 'rgb(0, 231, 0)' : 'red'
        }
        const marketCap = coin.market_cap.toString().split('').reverse().map((v,i,a) => i%3===0 && i !== 0 ?v+',': v).reverse().join('')
        const green = coin.price_change_24h >= 0
        return(
            <tr key={index} className='fs-5 pointer' onClick={()=>  navigate(`/currencies/${coin.id}`)}  >
                {!mobileOnly &&  <td className=" fs-1" onClick={(e)=>{e.stopPropagation(); dispatch(watchlist(coin,watchlistArray))}}><i className={`star-icon ${iconClass}`}></i></td>}
               {!mobileOnly &&  <td className="">{coin.market_cap_rank}</td>}
                <td className="flex fw-600 gap-0 align-center">
                    <img src={coin.image} className='small-img'/>
                    <div>
                        <p>{coin.name}</p>
                        <p className="fs-5 text-grey uppercase">{coin.symbol}</p>
                    </div>
                </td>
                <Suspense>
                    <td>{index < 10 ? <PriceChart id={coin.id} range={0} large={false} green={green} /> : '-'}</td>
                </Suspense>
                <td className="text-left">
                    <div>
                        <p>${coin.current_price}</p>
                        <p style={priceChangeStyle}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                </td>
                {!mobileOnly &&  <td className="text-left">${marketCap}</td>}
            </tr>
        )
    })

    return(
        <div className="container">
            <h2>Top currencies</h2>
            <table className=" card bg-white table currency--table">
                <thead className="">
                    <tr className="fs-5 text-grey">
                        {!mobileOnly &&  <th className=""></th>}
                        {!mobileOnly &&  <th className="">#</th>}
                        <th>Name</th>
                        <th></th>
                        <th className="text-left">Price</th>
                        {!mobileOnly &&  <th className="text-left">Market Cap</th>}
                    </tr>
                </thead>
                <tbody>
                    {currencies}
                </tbody>
            </table>
        </div>
    )
}