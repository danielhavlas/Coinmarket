export enum WATCHLIST_ACTION_TYPES {
    SET_WATCHLIST = 'SET_WATCHLIST'
}

export interface ICoinData {
    price_change_24h: number,
    image: string,
    current_price: number,
    id: number,
    name: string,
    symbol: string
}