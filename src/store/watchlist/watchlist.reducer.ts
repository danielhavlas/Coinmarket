import {WATCHLIST_ACTION_TYPES, ICoinData } from "./watchlist.types";
import { WatchlistAction } from "./watchlist.action";


export type WatchlistState = {
    readonly watchlistArray: ICoinData[]
}

const INITIAL_STATE: WatchlistState = {
    watchlistArray: [],
}

export const watchlistReducer = (state = INITIAL_STATE, action = {} as WatchlistAction) => {

    switch(action.type){
        case WATCHLIST_ACTION_TYPES.SET_WATCHLIST:
            return{
                ...state,
                watchlistArray: action.payload
            }
        default:
            return state
    }
}
