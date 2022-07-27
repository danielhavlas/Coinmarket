import React,{useState} from 'react'
const WatchlistContext = React.createContext()

function WatchlistContextProvider(props){
    const [watchlistArray, setWatchlistArray] = useState([])

    function watchlist(coinData){
        if(watchlistArray.map(v => v.id).includes(coinData.id)){
            setWatchlistArray(prevWatchlistArray => prevWatchlistArray.filter(v => v.id !==coinData.id))
        }else{
            setWatchlistArray(prevArray => [...prevArray, coinData])
        }
    }
    return(
        <WatchlistContext.Provider value={{watchlistArray,watchlist}}>
            {props.children}
        </WatchlistContext.Provider>
    )
}

export {WatchlistContextProvider, WatchlistContext}