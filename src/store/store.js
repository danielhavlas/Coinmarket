import {createStore, compose, applyMiddleware} from 'redux'
import { rootReducer } from "./root-reducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    blackList: ['portfolio','user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)