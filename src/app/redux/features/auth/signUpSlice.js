import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const initialState = {
  signUp: null,
  success: false,
  error: null,
  loading: false,

  otp: null,
  otpSuccess: false,
  otpError: null,
  otpLoading: false,
};

export const fetchSignUp = createAsyncThunk(
  "signUp/fetchSignUp",
  async ({ data }) => {
    return axios
      .post(`${BASE_URL}/api/client/user/`, data, {
        headers: {
          'content-type': 'multipart/form-data'
        },
      })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUp: (state) => {
      state.success = false;
      state.error = null;
      state.signUp = null
    },
    resetOtp: (state) => {
      state.otpSuccess = false;
      state.otpError = null;
      state.otp = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.loading = false
      console.log(action.payload)
      if (action.payload.id) {
        state.success = true;
        state.signUp = action.payload;
        state.error = null;
        toast.success("Account successfully registered.")
      } else {
        state.loading = false
        state.success = false;
        state.signUp = null;
        state.error = action.payload;
        action.payload?.detail ? toast.error(action?.payload?.detail) : toast.error("You have errors in your form")
        !(action.payload) && toast.error("Network error, refresh and try again.")
      }
    });
    builder.addCase(fetchSignUp.rejected, (state) => {
      state.loading = false
      state.success = false;
      state.error = "sysError"
      state.loading = false
      toast.error("Network error, refresh and try again.")
    });

    builder.addCase(signUpOtp.pending, (state) => {
      state.otpLoading = true;
    });
    builder.addCase(signUpOtp.fulfilled, (state, action) => {
      state.otpLoading = false

      if (action.payload.user_type_id) {
        state.otpSuccess = true;
        state.otp = action.payload;
        state.otpError = null;
        toast.success("Account successfully verified.")
      } else {
        state.success = false;
        state.otp = null;
        state.otpError = action.payload;
        action.payload && toast.error(`${action.payload?.detail}`)
        !(action.payload) && toast.error("Network error, refresh and try again.")
      }
    });
    builder.addCase(signUpOtp.rejected, (state) => {
      state.otpSuccess = false;
      state.otpError = "sysError"
      toast.error("Network error, refresh and try again.")
    });

    builder.addCase(resendOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resendOtp.fulfilled, (state, action) => {
      state.loading = false

      if (action.payload.detail === "Email verification code sent") {
        toast.success(`${action.payload?.detail}`)
      } else {
        action.payload && toast.error(`${action.payload?.detail}`)
        !(action.payload) && toast.error("Network error, refresh and try again.")
      }
    });
    builder.addCase(resendOtp.rejected, (state) => {
      toast.error("Network error, refresh and try again.")
    });
  },
});

export const { resetSignUp, resetOtp } = signUpSlice.actions;

export default signUpSlice;
