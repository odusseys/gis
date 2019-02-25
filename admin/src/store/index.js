import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
const rootReducer = combineReducers({
  auth
});

const persistConfig = {
  key: "root",
  storage
};

const persisted = persistReducer(persistConfig, rootReducer);

const store = createStore(persisted);

export default store;

export const persistor = persistStore(store);

export const Provider = p => <ReduxProvider store={store} {...p} />;
