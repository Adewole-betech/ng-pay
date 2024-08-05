import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearTokens, setTokens } from "./tokenSlice";
import { toast } from "react-toastify";

const BASE_URL = process.env.API_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  userLogin: null,
  isLoggedIn: false,
  error: null,
};

export const loginAuth = createAsyncThunk(
  "login/loginAuth",
  async (data, { dispatch }) => {
    return axios
      .post(`${BASE_URL}/login/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        dispatch(
          setTokens({ accessToken: access_token, refreshToken: refresh_token })
        );
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userLogin = null;
      // dispatch(
      clearTokens();
      // )
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);

      if (action.payload.access_token) {
        state.success = true;
        state.userLogin = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        toast.success("Login successful");
      } else {
        state.success = false;
        state.userLogin = null;
        state.isLoggedIn = false;
        state.error = action.payload;
      }
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userLogin = null;
      state.isLoggedIn = false;
      state.error = "sysError";
      toast.error("Network error, refresh and try again.");
    });
  },
});

export const { logout, resetError } = loginSlice.actions;

export default loginSlice;
