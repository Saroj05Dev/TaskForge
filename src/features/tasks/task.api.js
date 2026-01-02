import axiosInstance from "@/helpers/axiosInstance";

export const fetchTasksApi = () => {
  return axiosInstance.get("/tasks");
};

export const deleteTaskApi = (taskId) =>
  axiosInstance.delete(`/tasks/${taskId}`);

export const assignTaskApi = (taskId) =>
  axiosInstance.post(`/tasks/${taskId}/assign-smart`);

export const fetchTaskByIdApi = (taskId) =>
  axiosInstance.get(`/tasks/${taskId}`);

export const updateTaskApi = (taskId, data) => {
    return axiosInstance.put(`/tasks/${taskId}`, data);
}