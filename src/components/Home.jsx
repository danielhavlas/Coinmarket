import Watchlist from './Watchlist'
import Portfolio from './Portfolio'
import Header from './Header'
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
        return(
        <div className='flex'>
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
        console.log(coin);
        return(
        <div className='flex'>
            <h3>{coin.name}</h3>
            <h3>${coin.current_price}</h3>
        </div>
    )})


    return(
        <div className="home">
            <Header />
            <div className="container">
                <div className="flex home-grid">
                    {/* <Portfolio /> */}
                    {assets}
                    {watchlist}
                    {/* <Watchlist /> */}
                </div>
            </div>
        </div>
    )
}