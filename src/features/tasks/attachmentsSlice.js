import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAttachmentsApi,
  addAttachmentApi,
  deleteAttachmentApi,
} from "./taskDetails.api";

// Fetch attachments for a task
export const fetchAttachments = createAsyncThunk(
  "attachments/fetchAttachments",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getAttachmentsApi(taskId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attachments"
      );
    }
  }
);

// Add an attachment
export const addAttachment = createAsyncThunk(
  "attachments/addAttachment",
  async ({ taskId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await addAttachmentApi(taskId, formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload attachment"
      );
    }
  }
);

// Delete an attachment
export const deleteAttachment = createAsyncThunk(
  "attachments/deleteAttachment",
  async ({ taskId, publicId }, { rejectWithValue }) => {
    try {
      await deleteAttachmentApi(taskId, publicId);
      return publicId; // Return publicId to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete attachment"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  uploading: false,
  deleting: false,
};

const attachmentsSlice = createSlice({
  name: "attachments",
  initialState,
  reducers: {
    clearAttachments: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch attachments
      .addCase(fetchAttachments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttachments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAttachments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add attachment
      .addCase(addAttachment.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(addAttachment.fulfilled, (state, action) => {
        state.uploading = false;
        state.items.push(action.payload);
      })
      .addCase(addAttachment.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      // Delete attachment
      .addCase(deleteAttachment.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteAttachment.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter(
          (attachment) => attachment.publicId !== action.payload
        );
      })
      .addCase(deleteAttachment.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearAttachments } = attachmentsSlice.actions;
export default attachmentsSlice.reducer;
