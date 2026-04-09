import { Check, Trash2, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const STATUS_STYLES = {
  "Done":        "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  "In Progress": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  "Todo":        "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700",
};

const SubtaskItem = ({ subtask, onStatusChange, onDelete }) => {
  const handleStatusClick = () => {
    const order = ["Todo", "In Progress", "Done"];
    const next = order[(order.indexOf(subtask.status) + 1) % order.length];
    onStatusChange(subtask._id, { status: next });
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
      <button onClick={handleStatusClick}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer
          ${subtask.status === "Done" ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-gray-600 hover:border-blue-500"}`}>
        {subtask.status === "Done" && <Check size={12} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${subtask.status === "Done" ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}>
          {subtask.title}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${STATUS_STYLES[subtask.status] ?? STATUS_STYLES["Todo"]}`}>
            {subtask.status}
          </span>
          {subtask.assignedUser && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <User size={11} /><span>{subtask.assignedUser.fullName}</span>
            </div>
          )}
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {formatDistanceToNow(new Date(subtask.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <button onClick={() => onDelete(subtask._id)}
        className="sm:opacity-0 sm:group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer">
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default SubtaskItem;
