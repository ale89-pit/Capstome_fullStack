import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import { loginReducer } from "../reducers/logInReducer";

const bigReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
