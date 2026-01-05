import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSubtask,
  updateSubtask,
  deleteSubtask,
  fetchSubtasks,
} from "@/features/tasks/subtasksSlice";
import { useToast } from "@/contexts/ToastContext";

export const useSubtasks = (taskId) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const handleCreateSubtask = async () => {
    if (!subtaskTitle.trim()) {
      toast.error("Please enter a subtask title");
      return;
    }

    try {
      await dispatch(
        createSubtask({ taskId, title: subtaskTitle, status: "Todo" })
      ).unwrap();
      setSubtaskTitle("");
      toast.success("Subtask created successfully");
    } catch (error) {
      toast.error(error || "Failed to create subtask");
    }
  };

  const handleUpdateSubtask = async (subtaskId, data) => {
    try {
      await dispatch(updateSubtask({ subtaskId, data })).unwrap();
      toast.success("Subtask updated successfully");
    } catch (error) {
      toast.error(error || "Failed to update subtask");
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      await dispatch(deleteSubtask(subtaskId)).unwrap();
      toast.success("Subtask deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete subtask");
    }
  };

  const handleRefreshSubtasks = () => {
    dispatch(fetchSubtasks(taskId));
  };

  return {
    subtaskTitle,
    setSubtaskTitle,
    handleCreateSubtask,
    handleUpdateSubtask,
    handleDeleteSubtask,
    handleRefreshSubtasks,
  };
};
