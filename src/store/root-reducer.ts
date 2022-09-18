import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer.ts";
import { portfolioReducer } from "./portfolio/portfolio.reducer.ts";
import { watchlistReducer } from "./watchlist/watchlist.reducer.ts";

export const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer
})