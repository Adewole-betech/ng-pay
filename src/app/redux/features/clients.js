import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../api/axios";

const initialState = {
  clientColumns: [
    {
      key: "client_id",
      dataIndex: "client_id",
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
      key: "available_balance",
      dataIndex: "available_balance",
      title: "Available Balance",
      width: 150,
      hidden: false,
    },
    {
      key: "unsettled_balance",
      dataIndex: "unsettled_balance",
      title: "Unsettled Balance",
      width: 150,
      hidden: false,
    },
    {
      key: "preferred_gateway",
      dataIndex: "preferred_gateway",
      title: "Preferred Gateway",
      width: 150,
      hidden: false,
    },
    {
      key: "date_added",
      dataIndex: "date_added",
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
  extraReducers: (builder) => {},
});

export const { setClientColumns } = clientSlice.actions;
export default clientSlice;
