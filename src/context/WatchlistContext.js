import React,{useState, useEffect} from 'react'
const WatchlistContext = React.createContext()

function WatchlistContextProvider(props){
    const [watchlistArray, setWatchlistArray] = useState([])

    useEffect(()=> {

        setWatchlistArray(prevWatchlistArray => localStorage.getItem('watchlist') === null? prevWatchlistArray : JSON.parse(localStorage.getItem('watchlist')))

        
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