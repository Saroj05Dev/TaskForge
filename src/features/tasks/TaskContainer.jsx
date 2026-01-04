import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskPresenter from "./TaskPresenter";
import { fetchTasks, createTask, updateTask, deleteTask } from "./taskSlice";
import { useTaskSearch } from "@/hooks/useTaskSearch";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading, saving } = useSelector((state) => state.tasks);

  // Search and filter hook
  const {
    searchText,
    setSearchText,
    filters,
    handleFilterChange,
    clearSearch,
    clearFilters,
  } = useTaskSearch();

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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

  const handleCreate = (data) => dispatch(createTask(data));
  const handleUpdate = (data) =>
    dispatch(updateTask({ taskId: selectedTask._id, data }));
  const handleConfirmDelete = () => {
    dispatch(deleteTask(selectedTask._id));
    setOpenDeleteModal(false);
  };

  return (
    <TaskPresenter
      tasks={tasks}
      loading={loading}
      saving={saving}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      openFormModal={openFormModal}
      closeFormModal={closeFormModal}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      selectedTask={selectedTask}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onConfirmDelete={handleConfirmDelete}
      // Search and filter props
      searchText={searchText}
      onSearchChange={setSearchText}
      onSearchClear={clearSearch}
      filters={filters}
      onFilterChange={handleFilterChange}
      onFiltersClear={clearFilters}
    />
  );
};

export default TaskContainer;
