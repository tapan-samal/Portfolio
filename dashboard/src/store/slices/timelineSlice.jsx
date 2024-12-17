// addNewTimeline || deleteTimeline || getAllTimelines;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_TIMELINE } from "../../../utils/constant";

export const addNewTimeline = createAsyncThunk(
  "timeline/addNewTimeline",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_TIMELINE}/add`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllTimelines = createAsyncThunk(
  "timeline/getAllTimelines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_TIMELINE}/getall`, {
        withCredentials: true,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTimeline = createAsyncThunk(
  "timeline/deleteTimeline",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_TIMELINE}/delete/${id}`, {
        withCredentials: true,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelines: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewTimeline.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(addNewTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(addNewTimeline.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getAllTimelines.pending, (state) => {
        state.loading = true;
        state.timelines = [];
        state.error = null;
      })
      .addCase(getAllTimelines.fulfilled, (state, action) => {
        state.loading = false;
        state.timelines = action.payload;
        state.error = null;
      })
      .addCase(getAllTimelines.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(deleteTimeline.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(deleteTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(deleteTimeline.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export default timelineSlice.reducer;
