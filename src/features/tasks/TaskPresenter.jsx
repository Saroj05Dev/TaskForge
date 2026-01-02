import TaskList from "./components/TaskList";
import Loader from "@/components/ui/Loader";
import TaskFormModal from "./components/TaskFormModal";

const TaskPresenter = ({
  tasks,
  loading,
  onAdd,
  onEdit,
  openModal,
  closeModal,
  editTask,
  onCreate,
  onUpdate,
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

      <TaskList tasks={tasks} onEdit={onEdit} />

      <TaskFormModal
        open={openModal}
        onClose={closeModal}
        mode={editTask ? "edit" : "create"}
        initialData={editTask}
        onSubmit={(data) =>
          editTask ? onUpdate(editTask, data) : onCreate(data)
        }
      />
    </div>
  );
};

export default TaskPresenter;
