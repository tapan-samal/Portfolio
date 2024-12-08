// addNewTimeline || deleteTimeline || getAllTimelines;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/constant";

export const addNewTimeline = createAsyncThunk(
  "timeline/addNewTimeline",
  async () => {}
);

export const deleteTimeline = createAsyncThunk(
  "timeline/deleteTimeline",
  async () => {}
);
export const getAllTimelines = createAsyncThunk(
  "timeline/getAllTimelines",
  async () => {}
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
        state.error = null;
      })
      .addCase(addNewTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllTimelines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTimelines.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllTimelines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default timelineSlice.reducer;
