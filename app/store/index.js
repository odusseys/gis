import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import config from './config';
import auth from './auth';

const rootReducer = combineReducers({
  config,
  auth,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persisted = persistReducer(persistConfig, rootReducer);

const store = createStore(persisted);

export default store;

export const persistor = persistStore(store);
