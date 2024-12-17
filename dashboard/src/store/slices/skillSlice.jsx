// addNewSkill || updateSkill || deleteSkill || getAllSkills
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_SKILL } from "../../../utils/constant";

export const addNewSkill = createAsyncThunk(
  "skill/addNewSkill",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_SKILL}/add`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skill/updateSkill",
  async ({ id, proficiency }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_SKILL}/update/${id}`,
        { proficiency },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skill/deleteSkill",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_SKILL}/delete/${id}`, {
        withCredentials: true,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getAllSkills = createAsyncThunk(
  "skill/getAllSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_SKILL}/getall`, {
        withCredentials: true,
      });
      return response.data.skills;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const clearAllSkillError = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllError());
};

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearAllError(state) {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addNewSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(addNewSkill.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.skills = action.payload;
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillSlice.reducer;
