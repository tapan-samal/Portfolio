// addNewApplicationTool || deleteApplicationTool || getAllApplicationTools;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_TOOL } from "../../../utils/constant";

export const addNewApplicationTool = createAsyncThunk(
  "applicationTool/addNewApplicationTool",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_TOOL}/add`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred!"
      );
    }
  }
);

export const getAllApplicationTools = createAsyncThunk(
  "applicationTool/getAllApplicationTools",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_TOOL}/getall`, {
        withCredentials: true,
      });
      return response.data.applicationTool;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred!"
      );
    }
  }
);

export const deleteApplicationTool = createAsyncThunk(
  "applicationTool/deleteApplicationTool",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_TOOL}/delete/${id}`, {
        withCredentials: true,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred!"
      );
    }
  }
);

// Slice for application tools
const applicationToolSlice = createSlice({
  name: "applicationTool",
  initialState: {
    applicationTools: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewApplicationTool.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(addNewApplicationTool.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(addNewApplicationTool.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getAllApplicationTools.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(getAllApplicationTools.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationTools = action.payload;
        state.error = null;
      })
      .addCase(getAllApplicationTools.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(deleteApplicationTool.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(deleteApplicationTool.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationTools = state.applicationTools.filter(
          (tool) => tool._id !== action.meta.arg
        );
        state.message = action.payload;
        state.error = null;
      })
      .addCase(deleteApplicationTool.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = applicationToolSlice.actions;
export default applicationToolSlice.reducer;
