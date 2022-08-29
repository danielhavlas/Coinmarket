import { PORTFOLIO_ACTION_TYPES } from "./portfolio.types";

const INITIAL_STATE = {
    portfolioArray: [],
    usdBalance: 100000,
    totalBalance: 100000
}


export const portfolioReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO:
            return{
                ...state,
                ...payload
            }
        default:
            return state
    }
}
