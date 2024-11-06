import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearTokens, setTokens } from "./tokenSlice";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      .post(`${BASE_URL}/api/client/user/Login/`, data, {
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
      clearTokens();

      return {
        ...state,
        isLoggedIn: false,
        userLogin: null,
      };
    },
    resetError: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {

      if (action.payload.access_token) {
        toast.success("Login successful");
        return {
          ...state,
          loading: false,
          success: true,
          userLogin: action.payload,
          isLoggedIn: true,
          error: null,
        };
      } else {
        return {
          ...state,
          loading: false,
          success: false,
          userLogin: null,
          isLoggedIn: false,
          error: action.payload,
        };
      }
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      toast.error(action.error.message);
      return {
        ...state,
        loading: false,
        success: false,
        userLogin: null,
        isLoggedIn: false,
        error: action.error?.message,
      };
    });
  },
});

export const { logout, resetError } = loginSlice.actions;

export default loginSlice;
