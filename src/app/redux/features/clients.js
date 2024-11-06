import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../api/axios";
import { toast } from "react-toastify";

const initialState = {
  clientsList: [],
  listLoading: false,

  payoutConf: [],
  payoutLoading: false,

  clientColumns: [
    {
      key: "mchid",
      dataIndex: "mchid",
      title: "Client ID",
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
      key: "name",
      dataIndex: "name",
      title: "Name",
      width: 150,
      hidden: false,
    },
    {
      key: "availability",
      dataIndex: "availability",
      title: "Available Balance",
      width: 150,
      hidden: false,
    },
    {
      key: "balance",
      dataIndex: "balance",
      title: "Unsettled Balance",
      width: 150,
      hidden: false,
    },
    {
      key: "prefergw",
      dataIndex: "prefergw",
      title: "Preferred Gateway",
      width: 150,
      hidden: false,
    },
    {
      key: "createtime",
      dataIndex: "createtime",
      title: "Date Added",
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

export const getClientsList = createAsyncThunk(
  "client/getClientsList",
  async ({ page, page_size, status = "", mchid = "" }) => {
    return axiosAuth
      .get(
        `/api/client/clients?page=${page}&page_size=${page_size}&status=${status}&mchid=${mchid}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

export const getClientPayout = createAsyncThunk(
  "client/getClientPayout",
  async ({ page, page_size, status = "", mchid = "" }) => {
    return axiosAuth
      .get(
        `/api/client/payout?page=${page}&page_size=${page_size}&status=${status}&mchid=${mchid}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientColumns: (state, action) => {
      return {
        ...state,
        clientColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClientsList.pending, (state) => {
      return {
        ...state,
        listLoading: true,
      };
    });
    builder.addCase(getClientsList.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          listLoading: false,
          clientsList: action.payload,
        };
      } else {
        toast.error(`Error fetching balance history`);
        return {
          ...state,
          listLoading: false,
          clientsList: [],
        };
      }
    });
    builder.addCase(getClientsList.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        listLoading: false,
        clientsList: [],
      };
    });

    builder.addCase(getClientPayout.pending, (state) => {
      return {
        ...state,
        payoutLoading: true,
      };
    });
    builder.addCase(getClientPayout.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          payoutLoading: false,
          payoutConf: action.payload,
        };
      } else {
        toast.error(`Error fetching client payout configuration`);
        return {
          ...state,
          payoutLoading: false,
          payoutConf: [],
        };
      }
    });
    builder.addCase(getClientPayout.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        payoutLoading: false,
        payoutConf: [],
      };
    });
  },
});

export const { setClientColumns } = clientSlice.actions;
export default clientSlice;
