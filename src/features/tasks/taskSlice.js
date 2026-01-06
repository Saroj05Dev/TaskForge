import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  smartAssignTaskApi,
  createTaskApi,
  deleteTaskApi,
  fetchTasksApi,
  updateTaskApi,
  searchTasksApi,
} from "./task.api";

const initialState = {
  items: [],
  loading: false,
  saving: false,
  error: null,
};

export const createTask = createAsyncThunk(
  "tasks/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTaskApi(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to create task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ taskId, data }, { rejectWithValue }) => {
    try {
      const response = await updateTaskApi(taskId, data);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update task";
      return rejectWithValue(message);
    }
  }
);

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

export const searchTasks = createAsyncThunk(
  "tasks/search",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await searchTasksApi(filters);
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to search tasks");
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
      const message = error.response?.data?.message || "Failed to delete task";
      return rejectWithValue(message);
    }
  }
);

export const smartAssignTask = createAsyncThunk(
  "tasks/smartAssign",
  async ({ taskId, teamId }, { rejectWithValue }) => {
    try {
      const res = await smartAssignTaskApi(taskId, teamId);
      return res.data.data; // updated task
    } catch (error) {
      const message = error.response?.data?.message || "Failed to assign task";
      return rejectWithValue(message);
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

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
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
      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.saving = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.saving = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.saving = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
        state.saving = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      .addCase(smartAssignTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      })

      /* ---------- PERSIST STATUS ---------- */
      .addCase(persistTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) {
          // Preserve sharedWith field if backend doesn't return it
          const originalTask = state.items[index];
          state.items[index] = {
            ...updatedTask,
            sharedWith: updatedTask.sharedWith || originalTask.sharedWith,
          };
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

export const { updateTaskStatus, clearError } = taskSlice.actions;
export default taskSlice.reducer;
