import { updateDocument } from "../../utils/firebase.utils";
import { PORTFOLIO_ACTION_TYPES } from "./portfolio.types";

const INITIAL_STATE = {
    portfolioArray: [],
    usdBalance: 100000,
    totalBalance: 100000,
    isLoading: false,
    error:null
}


export const portfolioReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO:
            return {...state, ...payload}
        case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START:
            return {...state, isLoading: true}
        case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_SUCCESS:
            return{
                ...state,
                ...payload,
                isLoading:false
            }
        case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_FAILED:
            return {...state, isLoading: false, error:payload}
        default:
            return state
    }
}
