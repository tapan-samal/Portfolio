//userLogin || userLogout || getProfile || updateProfile
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/constant";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_USER}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return { user: response.data.user, message: response.data.message };
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("Network Error: Unable to reach the server!");
      }
      return rejectWithValue(error.response?.data?.message || "Login failed!");
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_USER}/logout`, {
        withCredentials: true,
      });
      return { message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to log out. Try again!"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_USER}/profile`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profile data!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_USER}/update/profile`,
        updatedData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return { user: response.data.user, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile.";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
    isAuthenticated: false,
    message: null,
    isUpdated: false,
  },
  reducers: {
    resetUserState(state) {
      state.isUpdated = false;
      state.message = null;
    },
    clearUserError(state) {
      state.error = null;
    },
    clearUserMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.isUpdated = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.message = action.payload.message;
        state.isUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUpdated = false;
      });
  },
});

export const { resetUserState, clearUserError, clearUserMessage } =
  userSlice.actions;
export default userSlice.reducer;
