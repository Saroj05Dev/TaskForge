import axiosInstance from "@/helpers/axiosInstance";

export const createTaskApi = (data) => axiosInstance.post("/tasks", data);

export const fetchTasksApi = () => {
  return axiosInstance.get("/tasks");
};

export const deleteTaskApi = (taskId) =>
  axiosInstance.delete(`/tasks/${taskId}`);

export const assignTaskApi = (taskId) =>
  axiosInstance.put(`/tasks/${taskId}/smart-assign`);

export const fetchTaskByIdApi = (taskId) =>
  axiosInstance.get(`/tasks/${taskId}`);

export const updateTaskApi = (taskId, data) => {
  return axiosInstance.put(`/tasks/${taskId}`, data);
};

export const searchTasksApi = (params) => {
  return axiosInstance.get("/tasks/search", { params });
};
