import { IAsset, IPortfolio } from "./portfolio.types.ts";
import { order, fetchPortfolioStart, fetchPortfolioSuccess, fetchPortfolioFailed, updatePortfolio } from "./portfolio.action.ts";
import { AnyAction } from "redux";

const INITIAL_STATE: IPortfolio = {
    portfolioArray: [],
    usdBalance: 100000,
    totalBalance: 100000,
}


export const portfolioReducer = (state = INITIAL_STATE, action = {} as AnyAction): IPortfolio => {

    if(order.match(action)){
        return {...state, ...action.payload}
    }
    if(updatePortfolio.match(action)){
        return {...state, ...action.payload}
    }
    if(fetchPortfolioStart.match(action)){
        return {...state}
    }
    if(fetchPortfolioSuccess.match(action)){
        return { ...state, ...action.payload.portfolio}
    }
    if(fetchPortfolioFailed.match(action)){
        return {...state}
    }
    
    return state
}
