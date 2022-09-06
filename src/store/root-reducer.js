import { userReducer } from "./user/user.reducer";

const { combineReducers } = require("redux"); // to create a big reducer

export const rootReducer = combineReducers({
    user: userReducer
});