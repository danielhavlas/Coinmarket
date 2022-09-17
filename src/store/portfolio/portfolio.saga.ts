import { takeLatest, all, call, put, select } from "typed-redux-saga";
import { getCurrentUser, getDocument, updateDocument } from "../../utils/firebase.utils.ts";
import { fetchPortfolioSuccess, fetchPortfolioFailed, updatePortfolio } from "./portfolio.action.ts";
import { IAsset, ICoinData, PORTFOLIO_ACTION_TYPES } from "./portfolio.types.ts";
import { selectorCurrentUser } from "../user/user.selector.ts";
import { selectorPortfolio } from "./portfolio.selector.ts";
import { fetchData } from '../../utils/fetchData.utils.ts'


export function* fetchPortfolioAsync(){
    const user = yield* select(selectorCurrentUser)
    try {
        console.log(user);
        const doc = yield* call(getDocument,user)
        yield* put(fetchPortfolioSuccess(doc))
        yield* call(updatePortfolioPrices)
    } catch (error) {
        yield* put(fetchPortfolioFailed(error as Error))
    }
}

function* postDocument() {
    const userAuth = yield* call(getCurrentUser)
    const portfolio = yield* select(selectorPortfolio)
    if(userAuth && portfolio){
        yield* call(updateDocument,userAuth,portfolio)
    }
}

export function* onFetchPortfolio () {
    yield* takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START,fetchPortfolioAsync)
}
export function* onPostPortfolio () {
    yield* takeLatest(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO,postDocument)
}

export async function* updatePortfolioPrices() {
    const portfolio = yield* select(selectorPortfolio)
    const usdBalance = yield portfolio.usdBalance
    const newPortfolioArray = yield* call(fetchPrices)
    yield* put(updatePortfolio(newPortfolioArray,usdBalance))
}

function* fetchPrices() {
    const portfolio = yield* select(selectorPortfolio)
    const newPortfolioArray: Promise<IAsset[]> = Promise.all(portfolio.portfolioArray.map( async asset => {
        const data = await fetchData<ICoinData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        return {...asset,coinData: data [0], value: data[0].current_price * asset.amount}
    }))
    return newPortfolioArray
}


export function* portfolioSaga(){
    yield* all([call(onFetchPortfolio),call(onPostPortfolio)])
}