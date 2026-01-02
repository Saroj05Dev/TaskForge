import { useNavigate } from "react-router-dom";
import TaskActions from "./TaskActions";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "#ef4444"; // red
    case "Medium":
      return "#f59e0b"; // amber
    case "Low":
      return "#22c55e"; // green
    default:
      return "#6b7280";
  }
};

const TaskCard = ({ task, onEdit, onDelete, saving }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "14px",
        marginBottom: "12px",
        cursor: "pointer",
        background: "#fff",
      }}
    >
      {/* Title */}
      <h4 style={{ fontWeight: 600, marginBottom: "6px" }}>
        {task.title}
      </h4>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: "#4b5563",
          marginBottom: "10px",
        }}
      >
        {task.description || "No description provided"}
      </p>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
        }}
      >
        <span>Status: {task.status}</span>

        <span
          style={{
            color: getPriorityColor(task.priority),
            fontWeight: 500,
          }}
        >
          {task.priority} Priority
        </span>
      </div>

      {/* Actions */}
      <TaskActions 
      task={task} 
      onEdit={onEdit} 
      onDelete={onDelete} 
      disabled={saving} 
    />
    </div>
  );
};

export default TaskCard;
