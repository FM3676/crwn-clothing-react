import { Middleware } from "redux";
import { RootState } from "../store";
// Create your own middleware Fun
/*      Currying Function 
    const curryFuc = a => (b, c) => a + b - c;
    const wit3 = curryFun(3);
    with3(2, 4) -----> 3 + 2 - 4
*/
export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    // It will only get us the new state if it's updated once it's run through all of the reducers with the action.
    next(action);

    console.log("next state: ", store.getState());
  };
