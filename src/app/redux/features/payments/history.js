import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";
import { toast } from "react-toastify";

const initialState = {
  paymentsHistory: [],
  historyLoading: false,
  paymentsTrend: [],
  trendLoading: false,

  paymentHistoryColumns: [
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
      title: "Transaction ID",
      width: 150,
      hidden: false,
    },
    {
      key: "ref",
      dataIndex: "ref",
      title: "Reference ID",
      width: 150,
      hidden: false,
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Order Amount",
      width: 120,
      hidden: false,
    },
    {
      key: "createtime",
      dataIndex: "createtime",
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
      key: "amount",
      dataIndex: "amount",
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

export const getPaymentsHistory = createAsyncThunk(
  "paymentHistory/getPaymentsHistory",
  async ({
    page,
    page_size,
    start_date = "",
    end_date = "",
    status = "",
    txid = "",
    txtype = "",
    ref = "",
  }) => {
    return axiosAuth
      .get(
        `/api/payments/transaction-history?page=${page}&page_size=${page_size}&end_date=${end_date}&start_date=${start_date}&status=${status}&txid=${txid}&txtype=${txtype}&ref=${ref}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

export const getPaymentsTrend = createAsyncThunk(
  "paymentHistory/getPaymentsTrend",
  async ({ start_date = "", end_date = "" }) => {
    return axiosAuth
      .get(
        `/api/payments/transaction-history/Trend?end_date=${end_date}&start_date=${start_date}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getPaymentsHistory.pending, (state) => {
      return {
        ...state,
        historyLoading: true,
      };
    });
    builder.addCase(getPaymentsHistory.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          historyLoading: false,
          paymentsHistory: action.payload,
        };
      } else {
        toast.error(`Error fetching payments history`);
        return {
          ...state,
          historyLoading: false,
          paymentsHistory: [],
        };
      }
    });
    builder.addCase(getPaymentsHistory.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        historyLoading: false,
        paymentsHistory: [],
      };
    });

    builder.addCase(getPaymentsTrend.pending, (state) => {
      return {
        ...state,
        trendLoading: true,
      };
    });
    builder.addCase(getPaymentsTrend.fulfilled, (state, action) => {
      console.log(action.payload)
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          trendLoading: false,
          paymentsTrend: action.payload,
        };
      } else {
        toast.error(`Error fetching payments trend`);
        return {
          ...state,
          trendLoading: false,
          paymentsTrend: [],
        };
      }
    });
    builder.addCase(getPaymentsTrend.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        trendLoading: false,
        paymentsTrend: [],
      };
    });
  },
});

export const { setHistoryColumns } = historySlice.actions;
export default historySlice;
