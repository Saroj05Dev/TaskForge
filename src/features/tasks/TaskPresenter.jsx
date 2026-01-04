import TaskList from "./components/TaskList";
import Loader from "@/components/ui/Loader";
import TaskFormModal from "./components/TaskFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Plus, ListTodo } from "lucide-react";

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
}) => {
  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ListTodo className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-sm text-gray-600 mt-0.5">
              Manage and organize your tasks
            </p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus size={20} />
          Add Task
        </button>
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
