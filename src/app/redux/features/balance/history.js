import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";
import { toast } from "react-toastify";

const initialState = {
  balanceHistory: [],
  historyLoading: false,

  balanceHistoryColumns: [
    {
      key: "mchid",
      dataIndex: "mchid",
      title: "Merchant ID",
      width: 120,
      hidden: false,
    },
    {
      key: "txid",
      dataIndex: "txid",
      title: "Settlement ID",
      width: 150,
      hidden: false,
    },
    {
      key: "settletime",
      dataIndex: "settletime",
      title: "Date",
      width: 150,
      hidden: false,
    },
    {
      key: "debitorcredit",
      dataIndex: "debitorcredit",
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
      key: "balacebefore",
      dataIndex: "balacebefore",
      title: "Balance Before",
      width: 150,
      hidden: false,
    },
    {
      key: "balanceafter",
      dataIndex: "balanceafter",
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

export const getBalancesHistory = createAsyncThunk(
  "balanceHistory/getBalancesHistory",
  async ({
    page,
    page_size,
    start_date = "",
    end_date = "",
    status = "",
    txid = "",
    debitorcredit = "",
  }) => {
    return axiosAuth
      .get(
        `/api/balances/settlement?page=${page}&page_size=${page_size}&end_date=${end_date}&start_date=${start_date}&status=${status}&txid=${txid}&debitorcredit=${debitorcredit}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getBalancesHistory.pending, (state) => {
      return {
        ...state,
        historyLoading: true,
      };
    });
    builder.addCase(getBalancesHistory.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          historyLoading: false,
          balanceHistory: action.payload,
        };
      } else {
        toast.error(`Error fetching balance history`);
        return {
          ...state,
          historyLoading: false,
          balanceHistory: [],
        };
      }
    });
    builder.addCase(getBalancesHistory.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        historyLoading: false,
        balanceHistory: [],
      };
    });
  },
});

export const { setBalanceHistoryColumns } = balanceHistorySlice.actions;
export default balanceHistorySlice;
