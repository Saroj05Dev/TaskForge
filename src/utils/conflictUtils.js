/**
 * Conflict Resolution Utilities
 * Helper functions for handling task conflicts
 */

/**
 * Get differences between server version and local changes
 * @param {Object} serverVersion - Server's version of the task
 * @param {Object} localChanges - User's local changes
 * @returns {Object} Object with changed, serverOnly, and localOnly fields
 */
export const getTaskDiff = (serverVersion, localChanges) => {
  const diff = {
    changed: {},
    serverOnly: {},
    localOnly: {},
  };

  const allKeys = new Set([
    ...Object.keys(serverVersion || {}),
    ...Object.keys(localChanges || {}),
  ]);

  allKeys.forEach((key) => {
    // Skip metadata fields
    if (["_id", "__v", "createdAt", "updatedAt", "version"].includes(key)) {
      return;
    }

    const serverValue = serverVersion?.[key];
    const localValue = localChanges?.[key];

    if (serverValue !== undefined && localValue !== undefined) {
      if (JSON.stringify(serverValue) !== JSON.stringify(localValue)) {
        diff.changed[key] = { server: serverValue, local: localValue };
      }
    } else if (serverValue !== undefined) {
      diff.serverOnly[key] = serverValue;
    } else if (localValue !== undefined) {
      diff.localOnly[key] = localValue;
    }
  });

  return diff;
};

/**
 * Merge local changes onto server version
 * @param {Object} serverVersion - Server's version of the task
 * @param {Object} localChanges - User's local changes
 * @returns {Object} Merged task data
 */
export const mergeTaskData = (serverVersion, localChanges) => {
  return {
    ...serverVersion,
    ...localChanges,
  };
};

/**
 * Format conflict message for display
 * @param {Object} serverVersion - Server's version with updatedBy info
 * @returns {string} Formatted message
 */
export const formatConflictMessage = (serverVersion) => {
  const userName = serverVersion?.updatedBy?.fullName || "Another user";
  const timestamp = serverVersion?.lastModified
    ? new Date(serverVersion.lastModified).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "recently";

  return `This task was modified by ${userName} at ${timestamp}`;
};

/**
 * Check if there are any actual differences
 * @param {Object} diff - Diff object from getTaskDiff
 * @returns {boolean} True if there are differences
 */
export const hasDifferences = (diff) => {
  return (
    Object.keys(diff.changed).length > 0 ||
    Object.keys(diff.serverOnly).length > 0 ||
    Object.keys(diff.localOnly).length > 0
  );
};

/**
 * Format field name for display
 * @param {string} fieldName - Field name from task object
 * @returns {string} Formatted field name
 */
export const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Format field value for display
 * @param {string} fieldName - Field name
 * @param {any} value - Field value
 * @returns {string} Formatted value
 */
export const formatFieldValue = (fieldName, value) => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return "Not set";
  }

  // Handle assignedUser - show name or "Unassigned"
  if (fieldName === "assignedUser") {
    if (typeof value === "object" && value?.fullName) {
      return value.fullName;
    }
    if (typeof value === "object" && value?.email) {
      return value.email;
    }
    return "Unassigned";
  }

  // Handle lastModified - format to IST
  if (fieldName === "lastModified") {
    try {
      return new Date(value).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return value;
    }
  }

  // Handle objects - stringify nicely
  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  // Return as string
  return String(value);
};
