// addNewApplicationTool || deleteApplicationTool || getAllApplicationTools;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/constant";

export const addNewApplicationTool = createAsyncThunk(
  "applicationTool/addNewApplicationTool",
  async () => {}
);

export const deleteApplicationTool = createAsyncThunk(
  "applicationTool/deleteApplicationTool",
  async () => {}
);
export const getAllApplicationTools = createAsyncThunk(
  "applicationTool/getAllApplicationTools",
  async () => {}
);

const applicationToolSlice = createSlice({
  name: "applicationTool",
  initialState: {
    applicationTools: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewApplicationTool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewApplicationTool.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewApplicationTool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteApplicationTool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApplicationTool.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteApplicationTool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllApplicationTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllApplicationTools.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllApplicationTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default applicationToolSlice.reducer;
