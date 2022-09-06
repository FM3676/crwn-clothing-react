import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// root-reducer

// Create middleware(run before an action hits the reducer), Whnerever dispatch an action before that action hits the reducers, it hits the middleware first.
const middleWares = [logger];

// In order for these middleware to actually work, we have to call applyMiddleware()
// "What we can do is we can say, these middleware are actually something like enhancers"
// Compose is a functional programming concept, it's essentially a way for us to pass multiple functions left to right.
const composedEnhancers = compose(applyMiddleware(...middleWares));

// pass enhancers as thrid argument, we can have different types of enhancers, middleWare is primary one.
export const store = createStore(
    rootReducer, // necessary
    undefined, // add any additional default states
    composedEnhancers
);

// We pass them as this compose enhancers thrid argument, it enhances our store, the middleware enhance our store
