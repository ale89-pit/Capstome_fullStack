//import per persist store

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
//import reducer
import userReducer from "../reducers/userReducer";
import { loginReducer } from "../reducers/logInReducer";
import { facilityReducer } from "../reducers/facilityReducer";
import { formFacilityReducer } from "../reducers/formFacilityReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};
const bigReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  facility: facilityReducer,
  formFacility: formFacilityReducer,
});
const persistedReducer = persistReducer(persistConfig, bigReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
