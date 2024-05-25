import { combineReducers } from "@reduxjs/toolkit";
import { userDataSlice } from "../features/auth/userDataSlice";
import loginSlice from "../features/auth/loginSlice";
import tokenSlice from "../features/auth/tokenSlice";
import { api } from "../api/rtkQuery";

const rootReducer = combineReducers({
  userData: userDataSlice.reducer,
  login: loginSlice.reducer,
  tokens: tokenSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
