import { createAction, ActionTypeWithPayload, withMatcher } from "../../utils/reducer.utils.ts";
import { WATCHLIST_ACTION_TYPES, ICoinData } from "./watchlist.types.ts";

export type Watchlist = ActionTypeWithPayload<WATCHLIST_ACTION_TYPES.SET_WATCHLIST, ICoinData[]>

export type UpdateWatchlist = ActionTypeWithPayload<WATCHLIST_ACTION_TYPES.SET_WATCHLIST, ICoinData[]>

export type WatchlistAction = Watchlist | UpdateWatchlist

export const watchlist = withMatcher((coinData: ICoinData, watchlistArray: ICoinData[]): Watchlist => {
    if(!watchlistArray) return [] as ICoinData[]
    const newWatchlist = () => {
        if(watchlistArray.map(v => v.id).includes(coinData.id)){
            return watchlistArray.filter(v => v.id !==coinData.id)
        }else{
            return [...watchlistArray, coinData]
        }
    }

    const newWatchlistArray = newWatchlist()

    return createAction(WATCHLIST_ACTION_TYPES.SET_WATCHLIST,newWatchlistArray)
})


export const updateWatchlist = withMatcher((newWatchlistArray: ICoinData[]): UpdateWatchlist => createAction(WATCHLIST_ACTION_TYPES.SET_WATCHLIST,newWatchlistArray))



export const isWatchlist = (coinData: ICoinData, watchlistArray: ICoinData[]) => {
    return watchlistArray.map(v => v.id).includes(coinData.id)
}