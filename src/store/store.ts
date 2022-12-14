import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import {PersistConfig,} from 'redux-persist'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";
import { middleware } from "yargs";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// root-reducer

// Create middleware(run before an action hits the reducer), Whnerever dispatch an action before that action hits the reducers, it hits the middleware first.
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  // thunk,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// Enable Redux DevTools
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// In order for these middleware to actually work, we have to call applyMiddleware()
// "What we can do is we can say, these middleware are actually something like enhancers"
// Compose is a functional programming concept, it's essentially a way for us to pass multiple functions left to right.
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// pass enhancers as thrid argument, we can have different types of enhancers, middleWare is primary one.
export const store = createStore(
  persistedReducer, // necessary argument
  undefined, // add any additional default states
  composedEnhancers
);

sagaMiddleware.run(rootSaga);
// We pass them as this compose enhancers thrid argument, it enhances our store, the middleware enhance our store

export const persistor = persistStore(store);
