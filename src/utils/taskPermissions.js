/**
 * Helper function to get user's permission level for a task
 * @param {Object} task - The task object
 * @param {String} userId - Current user's ID
 * @param {Array} userTeams - Array of team IDs the user belongs to
 * @returns {String} - Permission level: 'owner', 'full', 'edit', 'view', or null
 */
export const getUserTaskPermission = (task, userId, userTeams = []) => {
  if (!task || !userId) return null;

  // If user is the task creator/owner
  if (task.createdBy?._id === userId || task.createdBy === userId) {
    return "owner";
  }

  // Check if task is shared with user's teams
  if (
    task.sharedWith &&
    Array.isArray(task.sharedWith) &&
    userTeams.length > 0
  ) {
    // Find shares where user is a team member
    const userShares = task.sharedWith.filter((share) => {
      const teamId = share.team?._id || share.team;
      return userTeams.includes(teamId);
    });

    if (userShares.length > 0) {
      // Return highest permission level
      const permissions = userShares.map((share) => share.permissions);
      if (permissions.includes("full")) return "full";
      if (permissions.includes("edit")) return "edit";
      if (permissions.includes("view")) return "view";
    }
  }

  return null;
};

/**
 * Check if user can edit a task
 */
export const canEditTask = (task, userId, userTeams = []) => {
  const permission = getUserTaskPermission(task, userId, userTeams);
  return ["owner", "full", "edit"].includes(permission);
};

/**
 * Check if user can delete a task
 */
export const canDeleteTask = (task, userId, userTeams = []) => {
  const permission = getUserTaskPermission(task, userId, userTeams);
  return ["owner", "full"].includes(permission);
};

/**
 * Get permission display name
 */
export const getPermissionName = (permission) => {
  const names = {
    owner: "Owner",
    full: "Full Access",
    edit: "Edit Access",
    view: "View Only",
  };
  return names[permission] || "No Access";
};
