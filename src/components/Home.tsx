import React from 'react'

import { Link } from 'react-router-dom'
import PriceChart from './PriceChart.tsx'
import { useSelector } from "react-redux";
import { selectorPortfolio } from '../store/portfolio/portfolio.selector.ts';
import { selectorWatchlist } from '../store/watchlist/watchlist.selector.ts';
import { selectorCurrentUser } from "../store/user/user.selector.ts";
import ProfileIcon from './ProfileIcon.tsx'
import {useMobileOnly} from '../hooks/useMobileOnly.tsx'

interface ICoinData {
    price_change_24h: number,
    image: string,
    current_price: number,
    id: number,
    name: string,
    symbol: string
}

interface IAsset {
    id: number,
    coinData: ICoinData,
    amount: number,
    value: number,
}

interface IPortfolio {
    portfolioArray: IAsset[],
    usdBalance: number,
    totalBalance: number
}

export default function Home(){

    const {mobileOnly} = useMobileOnly()

    const currentUser = useSelector(selectorCurrentUser)
    
    const portfolio: IPortfolio = useSelector(selectorPortfolio)
    
    const watchlistArray: ICoinData[] =  useSelector(selectorWatchlist)
    
    const assets = portfolio.portfolioArray.map((asset, index) => {
        return(
        <div key={index} className='flex space-between'>
            <div>
                <div className="flex align-center gap-1">
                    <img className='small-img' src={asset.coinData.image}/>
                    <div>
                        <h3>{asset.coinData.name}</h3>
                        <p className='uppercase'>{asset.coinData.symbol}</p>
                    </div>
                </div>
            </div>
            <div className='text-left'>
                <h3>${asset.value.toFixed(2)}</h3>
                <p className='uppercase'>{asset.amount} {asset.coinData.symbol}</p>
            </div>

        </div>
    )})

    const watchlist = watchlistArray.map((coin,index) => {
        const green = coin.price_change_24h >= 0
        return(
        <Link to={`/currencies/${coin.id}`} key={index} className='flex space-between'>
            <div className="flex align-center gap-1">
                    <img className='small-img' src={coin.image}/>
                    <h3>{coin.name}</h3>
            </div>
            <PriceChart id={coin.id} range={0} large={false} green={green} />
            <h3>${coin.current_price}</h3>
        </Link>
    )})


    return(
        <div className="container">
            <div className="home">
                <div className="flex space-between align-center">
                    <h2 className='balance'>Balance: ${portfolio.totalBalance.toFixed(2)}</h2>
                    {mobileOnly && <ProfileIcon />}
                </div>
                <div className="home-grid">
                    <div className="watchlist-card card bg-white">
                        <h2>Watchlist</h2>
                        {watchlist}
                        <Link to='/currencies'><h3 className="fs-4 text-blue text-center"><span className='fs-3'>+</span> Explore</h3></Link>
                    </div>
                    <div className='portfolio-card card bg-white'>
                        <h2>Portfolio</h2>
                        <div className="flex space-between text-blue">
                            <h3>USD</h3>
                            <h3>${portfolio.usdBalance.toFixed(2)}</h3>
                        </div>
                        {assets}
                    </div>
                </div>
            </div>
        </div>
    )
}