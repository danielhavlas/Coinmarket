import {all , call} from 'redux-saga/effects'

import { portfolioSaga } from './portfolio/portfolio.saga.ts'

export function* rootSaga(){
    yield all([call(portfolioSaga)])
}