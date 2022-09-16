import { PORTFOLIO_ACTION_TYPES, IAsset } from "./portfolio.types";
import { PortfolioAction } from "./portfolio.action";

export type PortfolioState {
    portfolioArray: IAsset[],
    usdBalance: number,
    totalBalance: number
}

const INITIAL_STATE: PortfolioState = {
    portfolioArray: [],
    usdBalance: 100000,
    totalBalance: 100000,
}


export const portfolioReducer = (state = INITIAL_STATE, action = {} as PortfolioAction) => {

    switch(action.type){
        case PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO:
            return {...state, ...action.payload}
        case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START:
            return {...state
            }
        case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_SUCCESS:
            return{
                ...state,
                ...action.payload,
            }
        case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_FAILED:
            return {...state}
        default:
            return state
    }
}
