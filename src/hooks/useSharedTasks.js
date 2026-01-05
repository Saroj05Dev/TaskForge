import { useDispatch } from "react-redux";
import {
  shareTask,
  unshareTask,
  fetchTaskTeams,
  updateTaskPermissions,
} from "@/features/teams/sharedTasksSlice";
import { useToast } from "@/contexts/ToastContext";

export const useSharedTasks = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleShareTask = async (taskId, teamId, permissions = "edit") => {
    try {
      await dispatch(shareTask({ taskId, teamId, permissions })).unwrap();
      toast.success("Task shared with team successfully");
      // Refresh task teams
      dispatch(fetchTaskTeams(taskId));
    } catch (error) {
      toast.error(error || "Failed to share task");
    }
  };

  const handleUnshareTask = async (taskId, teamId) => {
    try {
      await dispatch(unshareTask({ taskId, teamId })).unwrap();
      toast.success("Task unshared from team");
    } catch (error) {
      toast.error(error || "Failed to unshare task");
    }
  };

  const handleUpdatePermissions = async (taskId, teamId, permissions) => {
    try {
      await dispatch(
        updateTaskPermissions({ taskId, teamId, permissions })
      ).unwrap();
      toast.success("Permissions updated successfully");
    } catch (error) {
      toast.error(error || "Failed to update permissions");
    }
  };

  return {
    handleShareTask,
    handleUnshareTask,
    handleUpdatePermissions,
  };
};
