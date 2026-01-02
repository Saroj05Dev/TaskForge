import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  assignTaskApi,
  deleteTaskApi,
  fetchTasksApi,
  updateTaskApi,
} from "./task.api";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

/* ---------------- THUNKS ---------------- */

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTasksApi();
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to load tasks");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskApi(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue("Failed to delete task");
    }
  }
);

export const smartAssignTask = createAsyncThunk(
  "tasks/smartAssign",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await assignTaskApi(taskId);
      return res.data.data; // updated task
    } catch (error) {
      return rejectWithValue("Failed to assign task");
    }
  }
);

export const persistTaskStatus = createAsyncThunk(
  "tasks/persistStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await updateTaskApi(id, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue({ id });
    }
  }
);

/* ---------------- SLICE ---------------- */

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Optimistic update for drag & drop
    updateTaskStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.items.find((t) => t._id === id);
      if (task) {
        task.previousStatus = task.status;
        task.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (t) => t._id !== action.payload
        );
      })

      /* ---------- SMART ASSIGN ---------- */
      .addCase(smartAssignTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex(
          (t) => t._id === updatedTask._id
        );
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      })

      /* ---------- PERSIST STATUS ---------- */
      .addCase(persistTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex(
          (t) => t._id === updatedTask._id
        );
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      })
      .addCase(persistTaskStatus.rejected, (state, action) => {
        const { id } = action.payload || {};
        const task = state.items.find((t) => t._id === id);
        if (task && task.previousStatus) {
          task.status = task.previousStatus;
          delete task.previousStatus;
        }
      });
  },
});

export const { updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
