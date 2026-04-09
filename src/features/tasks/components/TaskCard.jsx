import { useNavigate } from "react-router-dom";
import TaskActions from "./TaskActions";
import { User, AlertCircle, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PRIORITY = {
  High:   { pill: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",       dot: "bg-red-500"   },
  Medium: { pill: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800", dot: "bg-amber-400" },
  Low:    { pill: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800", dot: "bg-green-500" },
};

const STATUS = {
  "Done":        { pill: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400", dot: "bg-green-500" },
  "In Progress": { pill: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",     dot: "bg-blue-500"  },
  "Todo":        { pill: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",        dot: "bg-gray-400"  },
};

const TaskCard = ({ task, onEdit, onDelete, onShare, onSmartAssign }) => {
  const navigate = useNavigate();
  const priority = PRIORITY[task.priority] ?? PRIORITY.Low;
  const status   = STATUS[task.status]     ?? STATUS["Todo"];

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer flex flex-col gap-3"
    >
      {/* Title + priority */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150 leading-snug line-clamp-2 flex-1">
          {task.title}
        </h4>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priority.pill}`}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
        {task.description || "No description provided"}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-lg ${status.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {task.status}
        </span>

        {task.assignedUser ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700">
            <User size={11} className="text-gray-400" />{task.assignedUser.fullName}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700">
            <AlertCircle size={11} />Unassigned
          </span>
        )}

        {task.createdAt && (
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500 ml-auto">
            <Calendar size={10} />
            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </span>
        )}
      </div>

      {/* Shared badge */}
      {task.sharedWith?.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 px-2 py-1 rounded-lg w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          Shared with {task.sharedWith.length} team{task.sharedWith.length > 1 ? "s" : ""}
        </div>
      )}

      <TaskActions task={task} onEdit={onEdit} onDelete={onDelete} onShare={onShare} onSmartAssign={onSmartAssign} />
    </div>
  );
};

export default TaskCard;
