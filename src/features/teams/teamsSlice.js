import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTeamsApi,
  getTeamByIdApi,
  createTeamApi,
  updateTeamApi,
  inviteMemberApi,
  removeMemberApi,
  leaveTeamApi,
} from "./team.api";

// Fetch all user's teams
export const fetchAllTeams = createAsyncThunk(
  "teams/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTeamsApi();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teams"
      );
    }
  }
);

// Fetch team by ID
export const fetchTeamById = createAsyncThunk(
  "teams/fetchById",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await getTeamByIdApi(teamId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team"
      );
    }
  }
);

// Create team
export const createTeam = createAsyncThunk(
  "teams/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTeamApi(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create team"
      );
    }
  }
);

// Update team
export const updateTeam = createAsyncThunk(
  "teams/update",
  async ({ teamId, data }, { rejectWithValue }) => {
    try {
      const response = await updateTeamApi(teamId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team"
      );
    }
  }
);

// Invite member
export const inviteMember = createAsyncThunk(
  "teams/inviteMember",
  async ({ teamId, email }, { rejectWithValue }) => {
    try {
      const response = await inviteMemberApi(teamId, { email });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to invite member"
      );
    }
  }
);

// Remove member
export const removeMember = createAsyncThunk(
  "teams/removeMember",
  async ({ teamId, userId }, { rejectWithValue }) => {
    try {
      const response = await removeMemberApi(teamId, userId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove member"
      );
    }
  }
);

// Leave team
export const leaveTeam = createAsyncThunk(
  "teams/leave",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await leaveTeamApi(teamId);
      return { teamId, data: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to leave team"
      );
    }
  }
);

const initialState = {
  items: [], // Array of all user's teams
  currentTeam: null, // Currently selected team
  loading: false,
  error: null,
  creating: false,
  updating: false,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload;
    },
    clearTeams: (state) => {
      state.items = [];
      state.currentTeam = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all teams
      .addCase(fetchAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // Set first team as current if none selected
        if (!state.currentTeam && action.payload.length > 0) {
          state.currentTeam = action.payload[0];
        }
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch team by ID
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
        // Update current team if it's the same
        if (state.currentTeam?._id === action.payload._id) {
          state.currentTeam = action.payload;
        }
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create team
      .addCase(createTeam.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
        // Set as current team if it's the first one
        if (state.items.length === 1) {
          state.currentTeam = action.payload;
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      // Update team
      .addCase(updateTeam.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentTeam?._id === action.payload._id) {
          state.currentTeam = action.payload;
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Invite member
      .addCase(inviteMember.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentTeam?._id === action.payload._id) {
          state.currentTeam = action.payload;
        }
      })

      // Remove member
      .addCase(removeMember.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentTeam?._id === action.payload._id) {
          state.currentTeam = action.payload;
        }
      })

      // Leave team
      .addCase(leaveTeam.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (t) => t._id !== action.payload.teamId
        );
        // If left current team, select another one
        if (state.currentTeam?._id === action.payload.teamId) {
          state.currentTeam = state.items.length > 0 ? state.items[0] : null;
        }
      });
  },
});

export const { setCurrentTeam, clearTeams } = teamsSlice.actions;
export default teamsSlice.reducer;
