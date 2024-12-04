import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
