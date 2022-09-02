import {all , call} from 'redux-saga/effects'

import { portfolioSaga } from './portfolio/portfolio.saga'

export function* rootSaga(){
    yield all([call(portfolioSaga)])
}