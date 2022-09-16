export enum PORTFOLIO_ACTION_TYPES {
    SET_PORTFOLIO = 'SET_PORTFOLIO',
    FETCH_PORTFOLIO_START = 'FETCH_PORTFOLIO_START',
    FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS',
    FETCH_PORTFOLIO_FAILED = 'FETCH_PORTFOLIO_FAILED',
}

export interface ICoinData {
    price_change_24h: number,
    image: string,
    current_price: number,
    id: number,
    name: string,
    symbol: string
}

export interface IAsset {
    id: number,
    coinData: ICoinData,
    amount: number,
    value: number,
}

export interface IPortfolio {
    portfolioArray: IAsset[],
    usdBalance: number,
    totalBalance: number
}