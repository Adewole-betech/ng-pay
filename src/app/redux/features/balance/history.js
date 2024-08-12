import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  balanceHistoryColumns: [
    {
      key: "merchant_id",
      dataIndex: "merchant_id",
      title: "Merchant ID",
      width: 120,
      hidden: false,
    },
    {
      key: "settlement_id",
      dataIndex: "settlement_id",
      title: "Settlement ID",
      width: 150,
      hidden: false,
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      width: 150,
      hidden: false,
    },
    {
      key: "tx_type",
      dataIndex: "tx_type",
      title: "Transaction Type",
      width: 150,
      hidden: false,
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Amount",
      width: 120,
      hidden: false,
    },
    {
      key: "fee",
      dataIndex: "fee",
      title: "Fee",
      width: 120,
      hidden: false,
    },
    {
      key: "balance_before",
      dataIndex: "balance_before",
      title: "Balance Before",
      width: 150,
      hidden: false,
    },
    {
      key: "balance_after",
      dataIndex: "balance_after",
      title: "Balance After",
      width: 150,
      hidden: false,
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "Actions",
      width: 200,
      hidden: false,
    },
  ],
};

const balanceHistorySlice = createSlice({
  name: "balanceHistory",
  initialState,
  reducers: {
    setBalanceHistoryColumns: (state, action) => {
      return {
        ...state,
        balanceHistoryColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setBalanceHistoryColumns } = balanceHistorySlice.actions;
export default balanceHistorySlice;
