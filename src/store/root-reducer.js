import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { portfolioReducer } from "./portfolio/portfolio.reducer";
import { watchlistReducer } from "./watchlist/watchlist.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer
})