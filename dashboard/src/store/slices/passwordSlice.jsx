// updatePassword || forgotPassword || resetPassword
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL_USER } from "../../../utils/constant";

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    { currentPassword, newPassword, confirmNewPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL_USER}/update/password`,
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async () => {}
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async () => {}
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    password: {},
    loading: false,
    error: null,
    isAuthenticated: false,
    isUpdated: false,
    message: null,
  },
  reducer: {
    resetUpdatepassword(state) {
      state.isUpdated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
        state.error = null;
        state.message = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetUpdatepassword } = passwordSlice.actions;
export default passwordSlice.reducer;
