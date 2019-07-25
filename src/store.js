import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import middleware from 'src/middlewares'
import AsyncStorage from '@react-native-community/async-storage'

import rootReducer from 'src/reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, middleware)
export const persistor = persistStore(store)
