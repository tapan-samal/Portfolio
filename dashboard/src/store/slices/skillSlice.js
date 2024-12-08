// addNewSkill || updateSkill || deleteSkill || getAllSkills
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/constant";

export const addNewSkill = createAsyncThunk(
  "skill/addNewSkill",
  async () => {}
);

export const updateSkill = createAsyncThunk(
  "skill/updateSkill",
  async () => {}
);

export const deleteSkill = createAsyncThunk(
  "skill/deleteSkill",
  async () => {}
);

export const getAllSkills = createAsyncThunk(
  "skill/getAllSkills",
  async () => {}
);

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getAllSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default skillSlice.reducer;
