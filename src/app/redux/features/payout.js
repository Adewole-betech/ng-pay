import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../api/axios";

const initialState = {
  payoutColumns: [
    {
      key: "tx_id",
      dataIndex: "tx_id",
      title: "Transaction ID",
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
      key: "amount",
      dataIndex: "amount",
      title: "Amount",
      width: 120,
      hidden: false,
    },
    {
      key: "recipient",
      dataIndex: "recipient",
      title: "Recipient",
      width: 300,
      hidden: false,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      width: 120,
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

const payoutSlice = createSlice({
  name: "payout",
  initialState,
  reducers: {
    setPayoutColumns: (state, action) => {
      return {
        ...state,
        payoutColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setPayoutColumns } = payoutSlice.actions;
export default payoutSlice;
