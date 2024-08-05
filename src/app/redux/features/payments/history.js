import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  paymentHistoryColumns: [
    {
      key: "merchant_id",
      dataIndex: "merchant_id",
      title: "Merchant ID",
      width: 120,
      hidden: false,
    },
    {
      key: "tx_id",
      dataIndex: "tx_id",
      title: "Transaction ID",
      width: 150,
      hidden: false,
    },
    {
      key: "ref_id",
      dataIndex: "ref_id",
      title: "Reference ID",
      width: 150,
      hidden: false,
    },
    {
      key: "order_amount",
      dataIndex: "order_amount",
      title: "Order Amount",
      width: 120,
      hidden: false,
    },
    {
      key: "create_time",
      dataIndex: "create_time",
      title: "Create Time",
      width: 150,
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
      key: "paid_amount",
      dataIndex: "paid_amount",
      title: "Paid Amount",
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

const historySlice = createSlice({
  name: "paymentHistory",
  initialState,
  reducers: {
    setHistoryColumns: (state, action) => {
      return {
        ...state,
        paymentHistoryColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setHistoryColumns } = historySlice.actions;
export default historySlice;
