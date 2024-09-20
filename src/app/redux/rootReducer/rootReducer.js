import { combineReducers } from "@reduxjs/toolkit";
import { userDataSlice } from "../features/auth/userDataSlice";
import loginSlice from "../features/auth/loginSlice";
import tokenSlice from "../features/auth/tokenSlice";
import { api } from "../api/rtkQuery";
import historySlice from "../features/payments/history";
import exclusiveSlice from "../features/payments/exclusive";
import linksSlice from "../features/payments/links";
import balanceHistorySlice from "../features/balance/history";
import balanceSettlementSlice from "../features/balance/settlement";
import payoutSlice from "../features/payout";
import clientSlice from "../features/clients";
import teamsSlice from "../features/settings/teams";

const rootReducer = combineReducers({
  userData: userDataSlice.reducer,
  login: loginSlice.reducer,
  tokens: tokenSlice.reducer,
  paymentHistory: historySlice.reducer,
  paymentExclusive: exclusiveSlice.reducer,
  paymentLinks: linksSlice.reducer,
  balanceHistory: balanceHistorySlice.reducer,
  balanceSettlement: balanceSettlementSlice.reducer,
  payout: payoutSlice.reducer,
  client: clientSlice.reducer,
  teams: teamsSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
