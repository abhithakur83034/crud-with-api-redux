import { combineReducers } from "@reduxjs/toolkit";
import user from './user';
import product from "./product";
const rootReducer = combineReducers({
     user:user,
     product:product
});

export default rootReducer;