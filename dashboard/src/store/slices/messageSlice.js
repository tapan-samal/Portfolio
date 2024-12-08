// sendMessage || deleteMessage || getAllMessages

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/constant";


export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async () => {}
);

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async () => {}
);

export const getAllMessages = createAsyncThunk(
  "message/getAllMessages",
  async () => {}
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default messageSlice.reducer;
