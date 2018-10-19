import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import config from './config';
import auth from './auth';
import permissions from './permissions';

const rootReducer = combineReducers({
  config,
  auth,
  permissions,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persisted = persistReducer(persistConfig, rootReducer);

const store = createStore(persisted);

export default store;

export const persistor = persistStore(store);
