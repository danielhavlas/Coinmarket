import { ICoinData } from "./watchlist.types.ts";
import { watchlist, updateWatchlist } from "./watchlist.action.ts";
import { AnyAction } from "redux";


export type WatchlistState = {
    readonly watchlistArray: ICoinData[]
}

const INITIAL_STATE: WatchlistState = {
    watchlistArray: [],
}

export const watchlistReducer = (state = INITIAL_STATE, action = {} as AnyAction): WatchlistState => {

    if(watchlist.match(action)){
        return{
            ...state,
            watchlistArray: action.payload
        }
    }

    if(updateWatchlist.match(action)) {
        return{
            ...state,
            watchlistArray: action.payload
        }
    }

    return state
}
