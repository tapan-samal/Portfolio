// addNewProject || deleteProject || updateProject || getSingleProject || getAllProjects;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_PROJECT } from "../../../utils/constant";

export const addNewProject = createAsyncThunk(
  "project/addNewProject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_PROJECT}/add`, data, {
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

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL_PROJECT}/delete/${id}`, {
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

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_PROJECT}/update/${id}`,
        updateData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred!"
      );
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/getSingleProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_PROJECT}/get/${id}`, {
        withCredentials: true,
      });
      return response.data.project;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred!"
      );
    }
  }
);

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_PROJECT}/getall`, {
        withCredentials: true,
      });
      return response.data.projects;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred!"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProject.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(addNewProject.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (element) => element._id !== action.meta.arg
        );
        state.message = action.payload;
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.project;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
        state.error = null;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
