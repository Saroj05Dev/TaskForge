import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import store from "@/store/store";
import TaskPresenter from "./TaskPresenter";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  clearError,
} from "./taskSlice";
import { useTaskSearch } from "@/hooks/useTaskSearch";
import { useToast } from "@/contexts/ToastContext";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const {
    items: tasks,
    loading,
    saving,
    error,
  } = useSelector((state) => state.tasks);

  // Search and filter hook
  const {
    searchText,
    setSearchText,
    filters,
    handleFilterChange,
    clearSearch,
    clearFilters,
  } = useTaskSearch();

  // Seed search from URL param (e.g. navbar global search)
  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearchText(q);
  }, []);

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openSmartAssignModal, setOpenSmartAssignModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Watch for errors and show toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      // Clear error after showing to prevent duplicate toasts
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  const handleAdd = () => {
    setSelectedTask(null);
    setOpenFormModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpenFormModal(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setOpenDeleteModal(true);
  };

  const closeFormModal = () => setOpenFormModal(false);
  const closeDeleteModal = () => setOpenDeleteModal(false);

  const handleCreate = async (data) => {
    try {
      await dispatch(
        createTask({
          ...data,
          assigneeEmail: data.assigneeEmail, // Store email for future edits
        })
      ).unwrap();
      closeFormModal();
      toast.success("Task created successfully");
    } catch (error) {
      // Error toast will be shown by the useEffect watching the error state
      // But we keep the modal open so user can fix the issue
      console.error("Failed to create task:", error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const updatePayload = {
        ...data,
        version: selectedTask?.version || 0,
        lastModified: selectedTask?.lastModified,
        assigneeEmail: data.assigneeEmail,
      };

      await dispatch(
        updateTask({ taskId: selectedTask._id, data: updatePayload })
      ).unwrap();

      closeFormModal();
      toast.success("Task updated successfully");
    } catch (error) {
      // Close the form modal — if it's a conflict, the ConflictResolutionModal
      // (mounted globally in App.jsx) will open automatically via Redux state
      closeFormModal();

      // Only show error toast if it's NOT a conflict (conflict has its own modal)
      const isConflict = typeof error === "string"
        ? error.toLowerCase().includes("conflict")
        : error?.message?.toLowerCase().includes("conflict");

      if (!isConflict) {
        toast.error(error?.message || error || "Failed to update task");
      }
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteTask(selectedTask._id)).unwrap();
      setOpenDeleteModal(false);
      toast.success("Task deleted successfully");
    } catch (error) {
      // Error toast will be shown by the useEffect watching the error state
      setOpenDeleteModal(false);
    }
  };

  const handleShare = (task) => {
    setSelectedTask(task);
    setOpenShareModal(true);
  };

  const closeShareModal = () => {
    setOpenShareModal(false);
    setSelectedTask(null);
  };

  const handleSmartAssign = (task) => {
    setSelectedTask(task);
    setOpenSmartAssignModal(true);
  };

  return (
    <>
      <TaskPresenter
        tasks={tasks}
        loading={loading}
        saving={saving}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onShare={handleShare}
        onSmartAssign={handleSmartAssign}
        openFormModal={openFormModal}
        closeFormModal={closeFormModal}
        openDeleteModal={openDeleteModal}
        closeDeleteModal={closeDeleteModal}
        openShareModal={openShareModal}
        closeShareModal={closeShareModal}
        openSmartAssignModal={openSmartAssignModal}
        closeSmartAssignModal={() => setOpenSmartAssignModal(false)}
        selectedTask={selectedTask}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onConfirmDelete={handleConfirmDelete}
        searchText={searchText}
        onSearchChange={setSearchText}
        onSearchClear={clearSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        onFiltersClear={clearFilters}
      />
    </>
  );
};

export default TaskContainer;
