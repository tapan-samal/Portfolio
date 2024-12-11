// addNewProject || deleteProject || updateProject || getSingleProject || getAllProjects;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/constant";

export const addNewProject = createAsyncThunk(
  "project/addNewProject",
  async () => {}
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async () => {}
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async () => {}
);

export const getSingleProject = createAsyncThunk(
  "project/getSingleProject",
  async () => {}
);

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async () => {}
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    Project: {},
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getSingleProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
