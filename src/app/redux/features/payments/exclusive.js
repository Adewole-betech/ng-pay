import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  paymentExclusiveColumns: [
    {
      key: "merchant_id",
      dataIndex: "merchant_id",
      title: "Merchant ID",
      width: 120,
      hidden: false,
    },
    {
      key: "account_number",
      dataIndex: "account_number",
      title: "Account Number",
      width: 150,
      hidden: false,
    },
    {
      key: "bank_name",
      dataIndex: "bank_name",
      title: "Bank Name",
      width: 150,
      hidden: false,
    },
    {
      key: "notify_url",
      dataIndex: "notify_url",
      title: "Notify URL",
      width: 150,
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
      key: "paid_time",
      dataIndex: "paid_time",
      title: "Last Paid Time",
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
      key: "actions",
      dataIndex: "actions",
      title: "Actions",
      width: 200,
      hidden: false,
    },
  ],
};

const exclusiveSlice = createSlice({
  name: "paymentExclusive",
  initialState,
  reducers: {
    setExclusiveColumns: (state, action) => {
      return {
        ...state,
        paymentExclusiveColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setExclusiveColumns } = exclusiveSlice.actions;
export default exclusiveSlice;