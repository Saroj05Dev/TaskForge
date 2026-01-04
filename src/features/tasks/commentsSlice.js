import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsApi,
  addCommentApi,
  deleteCommentApi,
} from "./taskDetails.api";

// Fetch comments for a task
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getCommentsApi(taskId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ taskId, content }, { rejectWithValue }) => {
    try {
      const response = await addCommentApi(taskId, { comment: content });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await deleteCommentApi(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  adding: false,
  deleting: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add comment
      .addCase(addComment.pending, (state) => {
        state.adding = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.adding = false;
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload;
      })

      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
