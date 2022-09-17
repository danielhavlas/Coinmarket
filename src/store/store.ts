import {createStore, compose, applyMiddleware} from 'redux'
import { rootReducer } from "./root-reducer";
import {persistStore, persistReducer, PersistConfig} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['watchlist']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]
const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
