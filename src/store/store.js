import {createStore, compose, applyMiddleware} from 'redux'
import { rootReducer } from "./root-reducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import logger from 'redux-logger'
// const persistConfig = {
//     key: 'root',
//     storage,
//     blackList: ['portfolio','watchlist','user']
// }

// const persistedReducer = persistReducer(persistConfig,rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, logger]
const composedEnhancers = compose(applyMiddleware(...middlewares))
export const store = createStore(rootReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

// export const store = createStore(persistedReducer, undefined, composedEnhancers)

// export const persistor = persistStore(store)