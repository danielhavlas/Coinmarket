import { createAction } from "../../utils/reducer.utils";
import { PORTFOLIO_ACTION_TYPES } from "./portfolio.types";

export const setPortfolio = (portfolio) => {
    return createAction(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, portfolio)
}
const updateTotalBalance = (newPortfolio,newUsdBalance) => {
    const portfolioValue = newPortfolio.map(v => parseInt(v.value)).reduce((t,v) => t + v, 0)
    return portfolioValue + newUsdBalance
}
export const updatePortfolio = (newPortfolio,newUsdBalance) => {
    const updatedTotalBalance = updateTotalBalance(portfolio,newUsdBalance)
    const portfolio = {portfolioArray: newPortfolio, usdBalance:newUsdBalance, totalBalance: updatedTotalBalance}
    return createAction(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, portfolio)
}

export const order = (action,id,coinData,amount, price, portfolioArray, usdBalance) => {
    if(action==='buy'){
        const newPortfolio = () => {
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
        const newPortfolioArray = newPortfolio()
        const newUsdBalance = usdBalance - price
        const updatedTotalBalance = updateTotalBalance(newPortfolioArray,newUsdBalance)
        const portfolio = {portfolioArray: newPortfolioArray,usdBalance:newUsdBalance, totalBalance: updatedTotalBalance}
        return createAction(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, portfolio)
    }
    else if(action === 'sell'){
        const newPortfolio = () => {
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
        const newPortfolioArray = newPortfolio()
        const newUsdBalance = usdBalance + price
        const updatedTotalBalance = updateTotalBalance(newPortfolioArray,newUsdBalance)
        const portfolio = {portfolioArray: newPortfolioArray,usdBalance:newUsdBalance, totalBalance: updatedTotalBalance}
        return createAction(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO, portfolio)
    }
}