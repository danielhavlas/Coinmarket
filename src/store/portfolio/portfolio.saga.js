import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { getDocument, updateDocument } from "../../utils/firebase.utils";
import { fetchPortfolioSuccess, fetchPortfolioFailed } from "./portfolio.action";
import { PORTFOLIO_ACTION_TYPES } from "./portfolio.types";
import { selectorCurrentUser } from "../user/user.selector";
import { selectorPortfolio } from "../portfolio/portfolio.selector";


export function* fetchPortfolioAsync(){
    const user = yield select(selectorCurrentUser)
    try {
        const doc = yield call(getDocument,user)
        yield put(fetchPortfolioSuccess(doc))
    } catch (error) {
        yield put(fetchPortfolioFailed(user))
    }
}

function* postDocument() {
    const user = yield select(selectorCurrentUser)
    const portfolio = yield select(selectorPortfolio)
    yield call(updateDocument,user,{portfolio})
}

export function* onFetchPortfolio () {
    yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_START,fetchPortfolioAsync)
}
export function* onPostPortfolio () {
    yield takeLatest(PORTFOLIO_ACTION_TYPES.SET_PORTFOLIO,postDocument)
}


export function* portfolioSaga(){
    yield all([call(onFetchPortfolio)])
}
