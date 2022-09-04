import { takeLatest,takeEvery, all, call, put, select } from "redux-saga/effects";
import { getDocument, updateDocument } from "../../utils/firebase.utils";
import { fetchPortfolioSuccess, fetchPortfolioFailed, updatePortfolio } from "./portfolio.action";
import { PORTFOLIO_ACTION_TYPES } from "./portfolio.types";
import { selectorCurrentUser } from "../user/user.selector";
import { selectorPortfolio } from "../portfolio/portfolio.selector";


export function* fetchPortfolioAsync(){
    const user = yield select(selectorCurrentUser)
    try {
        const doc = yield call(getDocument,user)
        yield put(fetchPortfolioSuccess(doc))
        yield call(updatePortfolioPrices)
    } catch (error) {
        yield put(fetchPortfolioFailed(user))
    }
}

function* postDocument() {
    const user = yield select(selectorCurrentUser)
    const portfolio = yield select(selectorPortfolio)
    // yield console.log(user,portfolio);
    yield call(updateDocument,user,{portfolio})
}

export function* onFetchPortfolio () {
    yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START,fetchPortfolioAsync)
}
export function* onPostPortfolio () {
    yield takeLatest(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO,postDocument)
}

export function* updatePortfolioPrices() {
    
    const portfolio = yield select(selectorPortfolio)
    const usdBalance = yield portfolio.usdBalance
    const newPortfolioArray = yield call(fetchPrices)
    yield put(updatePortfolio(newPortfolioArray,usdBalance))
}

function* fetchPrices(){
    const portfolio = yield select(selectorPortfolio)
    const newPortfolioArray = yield Promise.all(portfolio.portfolioArray.map( async asset => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        const data = await res.json()
        return {...asset,coinData: data [0], value: data[0].current_price * asset.amount}
    }))
    return newPortfolioArray
}


export function* portfolioSaga(){
    yield all([call(onFetchPortfolio),call(onPostPortfolio)])
}