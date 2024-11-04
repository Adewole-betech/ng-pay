import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";
import { toast } from "react-toastify";

const initialState = {
  exclusivePayments: [],
  exclusiveLoading: false,

  paymentExclusiveColumns: [
    {
      key: "mchid",
      dataIndex: "mchid",
      title: "Merchant ID",
      width: 120,
      hidden: false,
    },
    {
      key: "accountnumber",
      dataIndex: "accountnumber",
      title: "Account Number",
      width: 150,
      hidden: false,
    },
    {
      key: "bankname",
      dataIndex: "bankname",
      title: "Bank Name",
      width: 150,
      hidden: false,
    },
    {
      key: "notifyurl",
      dataIndex: "notifyurl",
      title: "Notify URL",
      width: 150,
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
      key: "lastpaidtime",
      dataIndex: "lastpaidtime",
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

export const getPaymentsExclusive = createAsyncThunk(
  "paymentExclusive/getPaymentsExclusive",
  async ({
    page,
    page_size,
    start_date = "",
    end_date = "",
    start_paid_date = "",
    end_paid_date = "",
    status = "",
    mchid = "",
    accountnumber = "",
  }) => {
    return axiosAuth
      .get(
        `/api/payments/exclusive-account-history?page=${page}&page_size=${page_size}&end_date=${end_date}&start_date=${start_date}&end_paid_date=${end_paid_date}&start_paid_date=${start_paid_date}&status=${status}&mchid=${mchid}&accountnumber=${accountnumber}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getPaymentsExclusive.pending, (state) => {
      return {
        ...state,
        exclusiveLoading: true,
      };
    });
    builder.addCase(getPaymentsExclusive.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          exclusiveLoading: false,
          exclusivePayments: action.payload,
        };
      } else {
        toast.error(`Error fetching exclusive payments`);
        return {
          ...state,
          exclusiveLoading: false,
          exclusivePayments: [],
        };
      }
    });
    builder.addCase(getPaymentsExclusive.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        exclusiveLoading: false,
        exclusivePayments: [],
      };
    });
  },
});

export const { setExclusiveColumns } = exclusiveSlice.actions;
export default exclusiveSlice;
