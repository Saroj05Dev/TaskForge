import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSubtasksApi,
  createSubtaskApi,
  updateSubtaskApi,
  deleteSubtaskApi,
} from "./subtasks.api";

// Fetch subtasks for a task
export const fetchSubtasks = createAsyncThunk(
  "subtasks/fetchSubtasks",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getSubtasksApi(taskId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subtasks"
      );
    }
  }
);

// Create a subtask
export const createSubtask = createAsyncThunk(
  "subtasks/createSubtask",
  async ({ taskId, title, status }, { rejectWithValue }) => {
    try {
      const response = await createSubtaskApi(taskId, { title, status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create subtask"
      );
    }
  }
);

// Update a subtask
export const updateSubtask = createAsyncThunk(
  "subtasks/updateSubtask",
  async ({ subtaskId, data }, { rejectWithValue }) => {
    try {
      const response = await updateSubtaskApi(subtaskId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update subtask"
      );
    }
  }
);

// Delete a subtask
export const deleteSubtask = createAsyncThunk(
  "subtasks/deleteSubtask",
  async (subtaskId, { rejectWithValue }) => {
    try {
      await deleteSubtaskApi(subtaskId);
      return subtaskId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete subtask"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    clearSubtasks: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subtasks
      .addCase(fetchSubtasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubtasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubtasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create subtask
      .addCase(createSubtask.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createSubtask.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(createSubtask.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      // Update subtask
      .addCase(updateSubtask.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSubtask.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.items.findIndex(
          (subtask) => subtask._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateSubtask.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Delete subtask
      .addCase(deleteSubtask.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter(
          (subtask) => subtask._id !== action.payload
        );
      })
      .addCase(deleteSubtask.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubtasks } = subtasksSlice.actions;
export default subtasksSlice.reducer;
