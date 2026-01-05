import { Check, Trash2, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const SubtaskItem = ({ subtask, onStatusChange, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Todo":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatusClick = () => {
    const statusOrder = ["Todo", "In Progress", "Done"];
    const currentIndex = statusOrder.indexOf(subtask.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onStatusChange(subtask._id, { status: statusOrder[nextIndex] });
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      {/* Status Checkbox */}
      <button
        onClick={handleStatusClick}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          subtask.status === "Done"
            ? "bg-green-500 border-green-500"
            : "border-gray-300 hover:border-blue-500"
        }`}
      >
        {subtask.status === "Done" && (
          <Check size={14} className="text-white" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            subtask.status === "Done"
              ? "line-through text-gray-500"
              : "text-gray-900"
          }`}
        >
          {subtask.title}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(
              subtask.status
            )}`}
          >
            {subtask.status}
          </span>

          {subtask.assignedUser && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <User size={12} />
              <span>{subtask.assignedUser.fullName}</span>
            </div>
          )}

          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(subtask.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(subtask._id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-red-600 hover:bg-red-50 rounded transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default SubtaskItem;
