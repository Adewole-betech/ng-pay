import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../../api/axios";

const initialState = {
  teams: [],
  teamsLoading: false,

  teamsColumns: [
    {
      key: "username",
      dataIndex: "username",
      title: "Name",
      width: 300,
      hidden: false,
    },
    {
      key: "roles",
      dataIndex: "roles",
      title: "Role",
      width: 100,
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

export const getTeams = createAsyncThunk(
  "teams/getTeams",
  async ({ page, page_size, mchid = "" }) => {
    return axiosAuth
      .get(
        `/api/client/user?page=${page}&page_size=${page_size}&mchid=${mchid}`
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getTeams.pending, (state) => {
      return {
        ...state,
        teamsLoading: true,
      };
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      if (action.payload.results) {
        return {
          ...state,
          teamsLoading: false,
          teams: action.payload,
        };
      } else {
        toast.error(`Error fetching teams`);
        return {
          ...state,
          teamsLoading: false,
          teams: [],
        };
      }
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        teamsLoading: false,
        teams: [],
      };
    });
  },
});

export const { setTeamsColumns } = teamsSlice.actions;
export default teamsSlice;
