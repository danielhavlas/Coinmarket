import {WATCHLIST_ACTION_TYPES } from "./watchlist.types";

const INITIAL_STATE = {
    watchlistArray: [],
}


export const watchlistReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case WATCHLIST_ACTION_TYPES.SET_WATCHLIST:
            return{
                ...state,
                watchlistArray: payload
            }
        default:
            return state
    }
}
