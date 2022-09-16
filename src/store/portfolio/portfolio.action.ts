import { createAction, Action, ActionTypeWithPayload } from "../../utils/reducer.utils";
import { PORTFOLIO_ACTION_TYPES, IPortfolio, IAsset, ICoinData } from "./portfolio.types";

export type SetPortfolio = ActionTypeWithPayload<PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, IPortfolio>

export type FetchPortfolioStart = Action<PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START>

export type FetchPortfolioSuccess = ActionTypeWithPayload<PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_SUCCESS, IPortfolio>

export type FetchPortfolioFailed = ActionTypeWithPayload<PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_FAILED, Error>

export type PortfolioAction = SetPortfolio | FetchPortfolioStart | FetchPortfolioSuccess | FetchPortfolioFailed


const updateTotalBalance = (newPortfolioArray: IAsset[], newUsdBalance: number) => {
    const portfolioValue = newPortfolioArray.map(v => v.value).reduce((t,v) => t + v, 0)
    return portfolioValue + newUsdBalance
}
export const updatePortfolio = (newPortfolioArray: IAsset[], newUsdBalance: number): SetPortfolio => {
    const updatedTotalBalance = updateTotalBalance(newPortfolioArray,newUsdBalance)
    const portfolio: IPortfolio = {portfolioArray: newPortfolioArray, usdBalance:newUsdBalance, totalBalance: updatedTotalBalance}
    return createAction(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, portfolio)
}

export const fetchPortfolioStart = (): FetchPortfolioStart => createAction(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START)

export const fetchPortfolioSuccess = (userDoc): FetchPortfolioSuccess => createAction(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_SUCCESS, userDoc.portfolio)

export const fetchPortfolioFailed = (error: Error): FetchPortfolioFailed => createAction(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_FAILED, error)

export const order = (
    action: string,
    id: number,
    coinData: ICoinData,
    amount: number,
    price: number,
    portfolioArray: IAsset[],
    usdBalance: number): SetPortfolio => {

    let portfolio = {} as IPortfolio

    if(action==='buy'){
        const NewPortfolio = () => {
            const idArray = portfolioArray.map(v => v.id)
            if(idArray.includes(id)){
                return(
                    portfolioArray.map(asset => {
                        if(asset.id === id){
                            return {id,coinData,amount: asset.amount + amount, value: asset.value + price}
                        }else{
                            return asset
                        }
                    })
                )
            }else{
                
                return [...portfolioArray, {id,coinData, amount, value: price}]
            }
        }
        const newPortfolioArray = NewPortfolio()
        const newUsdBalance = usdBalance - price
        const updatedTotalBalance = updateTotalBalance(newPortfolioArray,newUsdBalance)
        const newPortfolio = {portfolioArray: newPortfolioArray,usdBalance:newUsdBalance, totalBalance: updatedTotalBalance}
        portfolio = newPortfolio
    }
    else if(action === 'sell'){
        const NewPortfolio = () => {
            return(
                portfolioArray.map(asset => {
                    if(asset.id === id){
                        return {...asset,amount: asset.amount - amount, value: (asset.amount - amount)*asset.coinData.current_price}
                    }else{
                        return asset
                    }
                }).filter(v => v.amount > 0)
            )
            
        }
        const newPortfolioArray = NewPortfolio()
        const newUsdBalance = usdBalance + price
        const updatedTotalBalance = updateTotalBalance(newPortfolioArray,newUsdBalance)
        const newPortfolio = {portfolioArray: newPortfolioArray,usdBalance:newUsdBalance, totalBalance: updatedTotalBalance}
        portfolio = newPortfolio
    }
    return createAction(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, portfolio)
}