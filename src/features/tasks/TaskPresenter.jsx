import TaskList from "./components/TaskList";
import Loader from "@/components/ui/Loader";
import TaskFormModal from "./components/TaskFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import ShareTaskModal from "@/features/teams/components/ShareTaskModal";
import SmartAssignModal from "./components/SmartAssignModal";
import DashboardLayout from "@/layouts/DashboardLayout";
import SearchBar from "./components/SearchBar";
import FilterDropdowns from "./components/FilterDropdowns";
import BackButton from "@/components/ui/BackButton";
import { Plus, CheckSquare } from "lucide-react";

const TaskPresenter = ({
  tasks, loading,
  onAdd, onEdit, onDelete, onShare, onSmartAssign,
  openFormModal, closeFormModal,
  openDeleteModal, closeDeleteModal,
  openShareModal, closeShareModal,
  openSmartAssignModal, closeSmartAssignModal,
  selectedTask, onCreate, onUpdate, onConfirmDelete,
  searchText, onSearchChange, onSearchClear,
  filters, onFilterChange, onFiltersClear,
}) => {
  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-px h-5 bg-gray-200" />
            <div className="p-2 bg-blue-600 rounded-xl shadow-sm">
              <CheckSquare size={17} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">All Tasks</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {tasks.length} task{tasks.length !== 1 ? "s" : ""} · click any card to view details
              </p>
            </div>
          </div>

          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-150 shadow-sm hover:shadow cursor-pointer self-start sm:self-auto"
          >
            <Plus size={17} />
            Add Task
          </button>
        </div>

        {/* Search + Filters */}
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

        {/* Task grid */}
        <TaskList
          tasks={tasks}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
          onSmartAssign={onSmartAssign}
        />
      </div>

      {/* Modals */}
      <TaskFormModal
        open={openFormModal}
        onClose={closeFormModal}
        mode={selectedTask ? "edit" : "create"}
        initialData={selectedTask}
        onSubmit={(data) => (selectedTask ? onUpdate(data) : onCreate(data))}
      />
      <DeleteConfirmModal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={onConfirmDelete}
        taskTitle={selectedTask?.title}
      />
      <ShareTaskModal
        open={openShareModal}
        onClose={closeShareModal}
        task={selectedTask}
      />
      <SmartAssignModal
        open={openSmartAssignModal}
        onClose={closeSmartAssignModal}
        task={selectedTask}
      />
    </DashboardLayout>
  );
};

export default TaskPresenter;
