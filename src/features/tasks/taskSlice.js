import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  smartAssignTaskApi,
  createTaskApi,
  deleteTaskApi,
  fetchTasksApi,
  fetchTaskByIdApi,
  updateTaskApi,
  searchTasksApi,
  resolveConflictApi,
} from "./task.api";

const initialState = {
  items: [],
  loading: false,
  saving: false,
  error: null,
  conflictData: {
    taskId: null,
    serverVersion: null,
    localChanges: null,
    isOpen: false,
  },
};

export const createTask = createAsyncThunk(
  "tasks/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTaskApi(data);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create task";
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ taskId, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateTaskApi(taskId, data);
      return response.data.data;
    } catch (error) {
      // Check if it's a 409 conflict error
      if (error.response?.status === 409) {
        const serverVersion = error.response.data.data;

        // Dispatch conflict data to show modal
        dispatch({
          type: "tasks/setConflictData",
          payload: {
            taskId,
            serverVersion,
            localChanges: data,
          },
        });

        return rejectWithValue(
          error.response.data.message || "Conflict detected"
        );
      }

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

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchById",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetchTaskByIdApi(taskId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch task"
      );
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

export const resolveConflict = createAsyncThunk(
  "tasks/resolveConflict",
  async ({ taskId, resolutionType, taskData }, { rejectWithValue }) => {
    try {
      const response = await resolveConflictApi(
        taskId,
        resolutionType,
        taskData
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to resolve conflict";
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
    // Update single task in list (for socket events)
    updateTaskInList(state, action) {
      const updatedTask = action.payload;
      const index = state.items.findIndex((t) => t._id === updatedTask._id);
      if (index !== -1) {
        state.items[index] = updatedTask;
      }
    },
    // Conflict management
    setConflictData(state, action) {
      state.conflictData = {
        ...action.payload,
        isOpen: true,
      };
    },
    clearConflictData(state) {
      state.conflictData = {
        taskId: null,
        serverVersion: null,
        localChanges: null,
        isOpen: false,
      };
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
      // FETCH TASK BY ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        // Add or update the task in items array
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
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
      .addCase(createTask.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
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

      /* ---------- RESOLVE CONFLICT ---------- */
      .addCase(resolveConflict.pending, (state) => {
        state.saving = true;
      })
      .addCase(resolveConflict.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.items.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
        state.saving = false;
        // Clear conflict data
        state.conflictData = {
          taskId: null,
          serverVersion: null,
          localChanges: null,
          isOpen: false,
        };
      })
      .addCase(resolveConflict.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
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

export const {
  updateTaskStatus,
  updateTaskInList,
  clearError,
  setConflictData,
  clearConflictData,
} = taskSlice.actions;
export default taskSlice.reducer;
