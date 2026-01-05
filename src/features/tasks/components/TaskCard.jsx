import { useNavigate } from "react-router-dom";
import TaskActions from "./TaskActions";
import { Clock, User, AlertCircle } from "lucide-react";

const getPriorityConfig = (priority) => {
  switch (priority) {
    case "High":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200",
      };
    case "Medium":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
      };
    case "Low":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-200",
      };
  }
};

const getStatusConfig = (status) => {
  switch (status) {
    case "Done":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
      };
    case "In Progress":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
      };
    case "Todo":
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
      };
  }
};

const TaskCard = ({ task, onEdit, onDelete, onShare }) => {
  const navigate = useNavigate();
  const priorityConfig = getPriorityConfig(task.priority);
  const statusConfig = getStatusConfig(task.status);

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="border border-gray-200 rounded-xl p-4 mb-4 cursor-pointer bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
    >
      {/* Header with Title and Priority */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
          {task.title}
        </h4>
        <span
          className={`${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border} border px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ml-3`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {task.description || "No description provided"}
      </p>

      {/* Meta Information */}
      <div className="flex items-center gap-4 mb-3 text-sm">
        {/* Status */}
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-gray-400" />
          <span
            className={`${statusConfig.bg} ${statusConfig.text} px-2 py-0.5 rounded text-xs font-medium`}
          >
            {task.status}
          </span>
        </div>

        {/* Assigned User */}
        {task.assignedUser && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-xs">{task.assignedUser.fullName}</span>
          </div>
        )}

        {/* Unassigned indicator */}
        {!task.assignedUser && (
          <div className="flex items-center gap-1.5 text-gray-500">
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs">Unassigned</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <TaskActions
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
      />
    </div>
  );
};

export default TaskCard;
