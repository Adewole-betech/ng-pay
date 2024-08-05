import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  paymentLinksColumns: [
    {
      key: "merchant_id",
      dataIndex: "merchant_id",
      title: "Merchant ID",
      width: 120,
      hidden: false,
    },
    {
      key: "ref_id",
      dataIndex: "ref_id",
      title: "Payment Reference",
      width: 180,
      hidden: false,
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: 300,
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
      key: "notify_url",
      dataIndex: "notify_url",
      title: "Payment Link",
      width: 180,
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
      width: 100,
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
      key: "actions",
      dataIndex: "actions",
      title: "Actions",
      width: 200,
      hidden: false,
    },
  ],
};

const linksSlice = createSlice({
  name: "paymentLinks",
  initialState,
  reducers: {
    setLinksColumns: (state, action) => {
      return {
        ...state,
        paymentLinksColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setLinksColumns } = linksSlice.actions;
export default linksSlice;
