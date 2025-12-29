import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActionsApi } from "./activity.api";

export const fetchActivities = createAsyncThunk(
  "activity/fetch",
  async (limit = 20, { rejectWithValue }) => {
    try {
      const res = await fetchActionsApi(limit);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load activities");
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    prependActivity(state, action) {
      state.items.unshift(action.payload);
      state.items = state.items.slice(0, 20);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { prependActivity } = activitySlice.actions;
export default activitySlice.reducer;
