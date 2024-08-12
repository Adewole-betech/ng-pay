import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  balanceSettlementColumns: [
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
      key: "order_amount",
      dataIndex: "order_amount",
      title: "Order Amount",
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

const balanceSettlementSlice = createSlice({
  name: "balanceSettlement",
  initialState,
  reducers: {
    setBalanceSettlementColumns: (state, action) => {
      return {
        ...state,
        balanceSettlementColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setBalanceSettlementColumns } = balanceSettlementSlice.actions;
export default balanceSettlementSlice;
