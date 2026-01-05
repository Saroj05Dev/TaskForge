import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  shareTaskApi,
  unshareTaskApi,
  getTeamTasksApi,
  getTaskTeamsApi,
  updatePermissionsApi,
} from "./sharedTasks.api";

// Share task with team
export const shareTask = createAsyncThunk(
  "sharedTasks/share",
  async ({ taskId, teamId, permissions }, { rejectWithValue }) => {
    try {
      const response = await shareTaskApi({ taskId, teamId, permissions });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to share task"
      );
    }
  }
);

// Unshare task from team
export const unshareTask = createAsyncThunk(
  "sharedTasks/unshare",
  async ({ taskId, teamId }, { rejectWithValue }) => {
    try {
      await unshareTaskApi(taskId, teamId);
      return { taskId, teamId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unshare task"
      );
    }
  }
);

// Get team tasks
export const fetchTeamTasks = createAsyncThunk(
  "sharedTasks/fetchTeamTasks",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await getTeamTasksApi(teamId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team tasks"
      );
    }
  }
);

// Get task teams
export const fetchTaskTeams = createAsyncThunk(
  "sharedTasks/fetchTaskTeams",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getTaskTeamsApi(taskId);
      return { taskId, teams: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch task teams"
      );
    }
  }
);

// Update permissions
export const updateTaskPermissions = createAsyncThunk(
  "sharedTasks/updatePermissions",
  async ({ taskId, teamId, permissions }, { rejectWithValue }) => {
    try {
      const response = await updatePermissionsApi(taskId, teamId, permissions);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update permissions"
      );
    }
  }
);

const initialState = {
  teamTasks: [], // Tasks shared with current team
  taskTeams: {}, // Map of taskId -> array of teams it's shared with
  loading: false,
  sharing: false,
  error: null,
};

const sharedTasksSlice = createSlice({
  name: "sharedTasks",
  initialState,
  reducers: {
    clearSharedTasks: (state) => {
      state.teamTasks = [];
      state.taskTeams = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Share task
      .addCase(shareTask.pending, (state) => {
        state.sharing = true;
        state.error = null;
      })
      .addCase(shareTask.fulfilled, (state, action) => {
        state.sharing = false;
      })
      .addCase(shareTask.rejected, (state, action) => {
        state.sharing = false;
        state.error = action.payload;
      })

      // Unshare task
      .addCase(unshareTask.fulfilled, (state, action) => {
        const { taskId, teamId } = action.payload;
        // Remove from taskTeams map
        if (state.taskTeams[taskId]) {
          state.taskTeams[taskId] = state.taskTeams[taskId].filter(
            (t) => t.team._id !== teamId
          );
        }
      })

      // Fetch team tasks
      .addCase(fetchTeamTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.teamTasks = action.payload;
      })
      .addCase(fetchTeamTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch task teams
      .addCase(fetchTaskTeams.fulfilled, (state, action) => {
        const { taskId, teams } = action.payload;
        state.taskTeams[taskId] = teams;
      })

      // Update permissions
      .addCase(updateTaskPermissions.fulfilled, (state, action) => {
        const updatedShare = action.payload;
        // Update in taskTeams map
        if (state.taskTeams[updatedShare.task]) {
          const index = state.taskTeams[updatedShare.task].findIndex(
            (t) => t.team._id === updatedShare.team
          );
          if (index !== -1) {
            state.taskTeams[updatedShare.task][index] = updatedShare;
          }
        }
      });
  },
});

export const { clearSharedTasks } = sharedTasksSlice.actions;
export default sharedTasksSlice.reducer;
