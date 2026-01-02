import { useDispatch } from "react-redux";
import { smartAssignTask } from "../taskSlice";

const TaskActions = ({ task, onEdit, onDelete, disabled }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
      {/* SMART ASSIGN */}
      <button
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(smartAssignTask(task._id));
        }}
      >
        Smart Assign
      </button>

      {/* EDIT */}
      <button
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(task);
        }}
      >
        Edit
      </button>

      {/* DELETE (CONFIRM MODAL) */}
      <button
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskActions;
