import { createAction } from "../../utils/reducer.utils";
import { WATCHLIST_ACTION_TYPES } from "./watchlist.types";

export const watchlist = (coinData, watchlistArray) => {
    
    const newWatchlist = () => {
        if(watchlistArray.map(v => v.id).includes(coinData.id)){
            return watchlistArray.filter(v => v.id !==coinData.id)
        }else{
            return [...watchlistArray, coinData]
        }
    }
    const newWatchlistArray = newWatchlist()
    return createAction(WATCHLIST_ACTION_TYPES.SET_WATCHLIST,newWatchlistArray)
}

export const isWatchlist = (coinData,watchlistArray) => {
    return watchlistArray.map(v => v.id).includes(coinData.id)
}