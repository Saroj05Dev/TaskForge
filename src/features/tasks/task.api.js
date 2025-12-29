import axiosInstance from "@/helpers/axiosInstance";

export const fetchTasksApi = () => {
  return axiosInstance.get("/tasks");
};

export const updateTaskApi = (taskId, data) => {
    return axiosInstance.put(`/tasks/${taskId}`, data);
}