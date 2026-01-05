import axiosInstance from "@/helpers/axiosInstance";

/**
 * SHARED TASKS API
 */

// Share task with team
export const shareTaskApi = (data) => {
  return axiosInstance.post("/shared-tasks", data);
};

// Unshare task from team
export const unshareTaskApi = (taskId, teamId) => {
  return axiosInstance.delete(`/shared-tasks/${taskId}/${teamId}`);
};

// Get team tasks
export const getTeamTasksApi = (teamId) => {
  return axiosInstance.get(`/shared-tasks/team/${teamId}`);
};

// Get task teams (teams a task is shared with)
export const getTaskTeamsApi = (taskId) => {
  return axiosInstance.get(`/shared-tasks/task/${taskId}`);
};

// Update shared task permissions
export const updatePermissionsApi = (taskId, teamId, permissions) => {
  return axiosInstance.patch(`/shared-tasks/${taskId}/${teamId}/permissions`, {
    permissions,
  });
};
