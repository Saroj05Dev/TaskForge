import axiosInstance from "@/helpers/axiosInstance";

/**
 * SUBTASKS API
 */

// Get all subtasks for a task
export const getSubtasksApi = async (taskId) => {
  return await axiosInstance.get(`/subtasks/${taskId}`);
};

// Create a subtask
export const createSubtaskApi = async (taskId, subtaskData) => {
  return await axiosInstance.post(`/subtasks/${taskId}`, subtaskData);
};

// Update a subtask
export const updateSubtaskApi = async (subtaskId, subtaskData) => {
  return await axiosInstance.put(`/subtasks/${subtaskId}`, subtaskData);
};

// Delete a subtask
export const deleteSubtaskApi = async (subtaskId) => {
  return await axiosInstance.delete(`/subtasks/${subtaskId}`);
};
