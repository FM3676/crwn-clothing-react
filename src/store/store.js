import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Create your own middleware Fun
/*      Currying Funcion 
    const curryFuc = a => (b, c) => a + b - c;
    const wit3 = curryFun(3);
    with3(2, 4) -----> 3 + 2 - 4
*/
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  // It will only get us the new state if it's updated once it's run through all of the reducers with the action.
  next(action);

  console.log("next state: ", store.getState());
};

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
