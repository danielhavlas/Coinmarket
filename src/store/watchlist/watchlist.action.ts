import { createAction, ActionTypeWithPayload } from "../../utils/reducer.utils";
import { WATCHLIST_ACTION_TYPES, ICoinData } from "./watchlist.types";

export type Watchlist = ActionTypeWithPayload<WATCHLIST_ACTION_TYPES.SET_WATCHLIST, ICoinData[]>

export type UpdateWatchlist = ActionTypeWithPayload<WATCHLIST_ACTION_TYPES.SET_WATCHLIST, ICoinData[]>

export type WatchlistAction = Watchlist | UpdateWatchlist

export const watchlist = (coinData: ICoinData, watchlistArray: ICoinData[]): Watchlist => {
    
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


export const updateWatchlist = (newWatchlistArray: ICoinData[]): UpdateWatchlist => createAction(WATCHLIST_ACTION_TYPES.SET_WATCHLIST,newWatchlistArray)



export const isWatchlist = (coinData: ICoinData, watchlistArray: ICoinData[]) => {
    return watchlistArray.map(v => v.id).includes(coinData.id)
}