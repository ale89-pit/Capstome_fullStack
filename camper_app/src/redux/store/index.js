
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "../reducers/registerReducer";

const bigReducer = combineReducers({
    user : userReducer,
    // login : loginReducer
})

const store = configureStore({
    reducer : bigReducer,
});

export default store;