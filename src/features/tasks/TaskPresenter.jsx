import TaskList from "./components/TaskList";
import Loader from "@/components/ui/Loader";
import TaskFormModal from "./components/TaskFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import DashboardLayout from "@/layouts/DashboardLayout";
import SearchBar from "./components/SearchBar";
import FilterDropdowns from "./components/FilterDropdowns";
import { Plus, ListTodo } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

const TaskPresenter = ({
  tasks,
  loading,

  onAdd,
  onEdit,
  onDelete,

  openFormModal,
  closeFormModal,

  openDeleteModal,
  closeDeleteModal,

  selectedTask,
  onCreate,
  onUpdate,
  onConfirmDelete,

  // Search and filter props
  searchText,
  onSearchChange,
  onSearchClear,
  filters,
  onFilterChange,
  onFiltersClear,
}) => {
  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Title and Add Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BackButton />
            <div className="p-2 bg-blue-100 rounded-lg">
              <ListTodo className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                All Tasks
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                Manage and organize your tasks
              </p>
            </div>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <SearchBar
            value={searchText}
            onChange={onSearchChange}
            onClear={onSearchClear}
            placeholder="Search by title or description..."
          />
          <FilterDropdowns
            filters={filters}
            onChange={onFilterChange}
            onClear={onFiltersClear}
          />
        </div>
      </div>

      {/* Task List */}
      <TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />

      {/* CREATE / EDIT MODAL */}
      <TaskFormModal
        open={openFormModal}
        onClose={closeFormModal}
        mode={selectedTask ? "edit" : "create"}
        initialData={selectedTask}
        onSubmit={(data) => (selectedTask ? onUpdate(data) : onCreate(data))}
      />

      {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={onConfirmDelete}
        taskTitle={selectedTask?.title}
      />
    </DashboardLayout>
  );
};

export default TaskPresenter;
