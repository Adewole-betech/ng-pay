import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  teamsColumns: [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      width: 300,
      hidden: false,
    },
    {
      key: "role",
      dataIndex: "role",
      title: "Role",
      width: 100,
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
      key: "last_active",
      dataIndex: "last_active",
      title: "Last Active",
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

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeamsColumns: (state, action) => {
      return {
        ...state,
        teamsColumns: action.payload?.columns,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setTeamsColumns } = teamsSlice.actions;
export default teamsSlice;
