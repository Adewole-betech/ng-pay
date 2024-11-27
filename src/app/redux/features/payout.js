import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../api/axios";

const initialState = {
  payoutHistory: [],
  historyLoading: false,
  payoutsTrend: [],
  trendLoading: false,

  payoutColumns: [
    {
      key: "txid",
      dataIndex: "txid",
      title: "Transaction ID",
      width: 150,
      hidden: false,
    },
    {
      key: "create_time",
      dataIndex: "create_time",
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

export const getPayoutHistory = createAsyncThunk(
  "payout/getPayoutHistory",
  async ({
    page,
    page_size,
    start_date = "",
    end_date = "",
    status = "",
    txid = "",
    reference = "",
  }) => {
    return axiosAuth
      .get(
        `/api/payments/payout-history?page=${page}&page_size=${page_size}&end_date=${end_date}&start_date=${start_date}&status=${status}&txid=${txid}&reference=${reference}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

export const getPayoutsTrend = createAsyncThunk(
  "payout/getPayoutsTrend",
  async ({ start_date = "", end_date = "" }) => {
    return axiosAuth
      .get(
        `/api/payments/payout-history/Trend?end_date=${end_date}&start_date=${start_date}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getPayoutHistory.pending, (state) => {
      return {
        ...state,
        historyLoading: true,
      };
    });
    builder.addCase(getPayoutHistory.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          historyLoading: false,
          payoutHistory: action.payload,
        };
      } else {
        toast.error(`Error fetching balance history`);
        return {
          ...state,
          historyLoading: false,
          payoutHistory: [],
        };
      }
    });
    builder.addCase(getPayoutHistory.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        historyLoading: false,
        payoutHistory: [],
      };
    });
    
    builder.addCase(getPayoutsTrend.pending, (state) => {
      return {
        ...state,
        trendLoading: true,
      };
    });
    builder.addCase(getPayoutsTrend.fulfilled, (state, action) => {
      console.log(action.payload)
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          trendLoading: false,
          payoutsTrend: action.payload,
        };
      } else {
        toast.error(`Error fetching payouts trend`);
        return {
          ...state,
          trendLoading: false,
          payoutsTrend: [],
        };
      }
    });
    builder.addCase(getPayoutsTrend.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        trendLoading: false,
        payoutsTrend: [],
      };
    });
  },
});

export const { setPayoutColumns } = payoutSlice.actions;
export default payoutSlice;
