import axiosInstance from "@/helpers/axiosInstance";

/**
 * COMMENTS API
 */

// Get all comments for a task
export const getCommentsApi = async (taskId) => {
  return await axiosInstance.get(`/comments/task/${taskId}`);
};

// Add a comment
export const addCommentApi = async (taskId, commentData) => {
  return await axiosInstance.post(`/comments/${taskId}`, commentData);
};

// Delete a comment
export const deleteCommentApi = async (commentId) => {
  return await axiosInstance.delete(`/comments/${commentId}`);
};

/**
 * ATTACHMENTS API
 */

// Get all attachments for a task
export const getAttachmentsApi = async (taskId) => {
  return await axiosInstance.get(`/attachments/${taskId}`);
};

// Add attachment (file upload)
export const addAttachmentApi = async (taskId, formData) => {
  return await axiosInstance.post(`/attachments/${taskId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete attachment
export const deleteAttachmentApi = async (taskId, publicId) => {
  return await axiosInstance.delete(
    `/attachments/${taskId}?publicId=${encodeURIComponent(publicId)}`
  );
};
