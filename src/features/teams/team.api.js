import axiosInstance from "@/helpers/axiosInstance";

/**
 * TEAM MANAGEMENT API
 */

// Get all user's teams
export const getAllTeamsApi = () => {
  return axiosInstance.get("/teams");
};

// Get team by ID
export const getTeamByIdApi = (teamId) => {
  return axiosInstance.get(`/teams/${teamId}`);
};

// Create team
export const createTeamApi = (data) => {
  return axiosInstance.post("/teams", data);
};

// Update team
export const updateTeamApi = (teamId, data) => {
  return axiosInstance.patch(`/teams/${teamId}`, data);
};

// Invite member
export const inviteMemberApi = (teamId, data) => {
  return axiosInstance.post(`/teams/${teamId}/invite-member`, data);
};

// Remove member
export const removeMemberApi = (teamId, userId) => {
  return axiosInstance.delete(`/teams/${teamId}/members/${userId}`);
};

// Leave team
export const leaveTeamApi = (teamId) => {
  return axiosInstance.post(`/teams/${teamId}/leave`);
};
