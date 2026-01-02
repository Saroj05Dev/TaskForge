import TaskList from "./components/TaskList";
import Loader from "@/components/ui/Loader";
import TaskFormModal from "./components/TaskFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h2>Tasks</h2>
        <button onClick={onAdd}>+ Add Task</button>
      </div>

      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* CREATE / EDIT MODAL */}
      <TaskFormModal
        open={openFormModal}
        onClose={closeFormModal}
        mode={selectedTask ? "edit" : "create"}
        initialData={selectedTask}
        onSubmit={(data) =>
          selectedTask ? onUpdate(data) : onCreate(data)
        }
      />

      {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={onConfirmDelete}
        taskTitle={selectedTask?.title}
      />
    </div>
  );
};

export default TaskPresenter;
