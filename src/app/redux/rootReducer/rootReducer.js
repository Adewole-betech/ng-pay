import { combineReducers } from "@reduxjs/toolkit";
import { userDataSlice } from "../features/auth/userDataSlice";
import loginSlice from "../features/auth/loginSlice";
import tokenSlice from "../features/auth/tokenSlice";
import { api } from "../api/rtkQuery";
import historySlice from "../features/payments/history";
import exclusiveSlice from "../features/payments/exclusive";
import linksSlice from "../features/payments/links";

const rootReducer = combineReducers({
  userData: userDataSlice.reducer,
  login: loginSlice.reducer,
  tokens: tokenSlice.reducer,
  paymentHistory: historySlice.reducer,
  paymentExclusive: exclusiveSlice.reducer,
  paymentLinks: linksSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
