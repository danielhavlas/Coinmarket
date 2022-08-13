import React,{useState, useEffect} from 'react'
const WatchlistContext = React.createContext()

function WatchlistContextProvider(props){
    const [watchlistArray, setWatchlistArray] = useState([])

    useEffect(()=> {

        setWatchlistArray(prevWatchlistArray => localStorage.getItem('watchlist') === null? prevWatchlistArray : JSON.parse(localStorage.getItem('watchlist')))

        async function updatePrices(){
            JSON.parse(localStorage.getItem('watchlist')).forEach(v => {
                fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${v.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                .then(res => res.json())
                .then(data => setWatchlistArray(prevWatchlistArray => prevWatchlistArray.map(i => {
                    console.log(i);
                    return i.id === v.id? data[0] : i
                })))
            })
        }
          
          updatePrices()
    },[])

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlistArray))
    },[watchlistArray])

    function watchlist(coinData){
        if(watchlistArray.map(v => v.id).includes(coinData.id)){
            setWatchlistArray(prevWatchlistArray => prevWatchlistArray.filter(v => v.id !==coinData.id))
        }else{
            setWatchlistArray(prevArray => [...prevArray, coinData])
        }
    }

    function isWatchlist(coinData){
        return watchlistArray.map(v => v.id).includes(coinData.id)
    }
    return(
        <WatchlistContext.Provider value={{watchlistArray,watchlist, isWatchlist}}>
            {props.children}
        </WatchlistContext.Provider>
    )
}

export {WatchlistContextProvider, WatchlistContext}