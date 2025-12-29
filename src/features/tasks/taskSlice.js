import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksApi, updateTaskApi } from "./task.api";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

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
      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      // PERSIST STATUS
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
        const { id } = action.payload;
        const task = state.items.find((t) => t._id === id);
        if (task) {
          task.status = task.previousStatus;
          delete task.previousStatus;
        }
      });
  },
});

export const { updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
