import Watchlist from './Watchlist'
import Portfolio from './Portfolio'
import { useRef, useContext, useEffect } from 'react'
import Stockpage from './Stockpage'
import { PortfolioContext } from '../PortfolioContext'
import { WatchlistContext } from '../WatchlistContext'

export default function Home(){

    const searchRef = useRef(null)
    const {portfolioArray} =  useContext(PortfolioContext)
    const {watchlistArray} =  useContext(WatchlistContext)
    // const url = 'https://api.coingecko.com/api/v3/coins/'

    // useEffect(()=>{
    //     const data = await Promise.all([
    //         portfolioArray.forEach(asset => {
    //             fetch(url+asset.id).then(response => response.json())
    //         })
    //     ]);
    // },[portfolioArray])

    
    const assets = portfolioArray.map(asset => {
        console.log(asset);
        return(
        <div className='flex space-between'>
            <div>
                <h3>{asset.coinData.name}</h3>
                <p className='uppercase'>{asset.coinData.symbol}</p>
            </div>
            <div>
                <h3>${asset.value}</h3>
                <p className='uppercase'>{asset.amount} {asset.coinData.symbol}</p>
            </div>

        </div>
    )})

    const watchlist = watchlistArray.map(coin => {
        return(
        <div className='flex space-between'>
            <h3>{coin.name}</h3>
            <h3>${coin.current_price}</h3>
        </div>
    )})


    return(
        <div className="home">
            <div className="container">
                <div className="flex home-grid">
                    <div className='portfolio-card card'>
                        <h2>Your portfolio</h2>
                        {assets}
                    </div>
                    <div className="watchlist-card card">
                        <h2>Your watchlist</h2>
                        {watchlist}
                    </div>
                </div>
            </div>
        </div>
    )
}