import { RootState } from "../store.ts"
import { WatchlistState } from "./watchlist.reducer.ts"

export const selectorWatchlist = (state: RootState):WatchlistState => state.watchlist.watchlistArray