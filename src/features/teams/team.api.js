import axiosInstance from "@/helpers/axiosInstance";

// Create team
export const createTeamApi = (data) => {
  return axiosInstance.post("/teams", data);
};

// Invite member
export const inviteMemberApi = (teamId, data) => {
  return axiosInstance.post(
    `/teams/${teamId}/invite-member`,
    data
  );
};

// Get team members
export const getTeamMembersApi = (teamId) => {
  return axiosInstance.get(`/teams/${teamId}`);
};

// Remove member
export const removeMemberApi = (teamId, memberId) => {
  return axiosInstance.delete(
    `/teams/${teamId}/remove-member/${memberId}`
  );
};
