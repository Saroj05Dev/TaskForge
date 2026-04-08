import { useNavigate } from "react-router-dom";
import TaskActions from "./TaskActions";
import { Clock, User, AlertCircle, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PRIORITY = {
  High:   { pill: "bg-red-50 text-red-600 border-red-200",    dot: "bg-red-500"   },
  Medium: { pill: "bg-amber-50 text-amber-600 border-amber-200", dot: "bg-amber-400" },
  Low:    { pill: "bg-green-50 text-green-600 border-green-200", dot: "bg-green-500" },
};

const STATUS = {
  "Done":        { pill: "bg-green-50 text-green-700", dot: "bg-green-500" },
  "In Progress": { pill: "bg-blue-50 text-blue-700",   dot: "bg-blue-500"  },
  "Todo":        { pill: "bg-gray-100 text-gray-600",  dot: "bg-gray-400"  },
};

const TaskCard = ({ task, onEdit, onDelete, onShare, onSmartAssign }) => {
  const navigate = useNavigate();
  const priority = PRIORITY[task.priority] ?? PRIORITY.Low;
  const status   = STATUS[task.status]     ?? STATUS["Todo"];

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="group relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer flex flex-col gap-3"
    >
      {/* Top row: title + priority */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-150 leading-snug line-clamp-2 flex-1">
          {task.title}
        </h4>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priority.pill}`}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
        {task.description || "No description provided"}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status */}
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-lg ${status.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {task.status}
        </span>

        {/* Assignee */}
        {task.assignedUser ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
            <User size={11} className="text-gray-400" />
            {task.assignedUser.fullName}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
            <AlertCircle size={11} />
            Unassigned
          </span>
        )}

        {/* Created at */}
        {task.createdAt && (
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 ml-auto">
            <Calendar size={10} />
            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </span>
        )}
      </div>

      {/* Shared badge */}
      {task.sharedWith?.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-teal-600 bg-teal-50 border border-teal-100 px-2 py-1 rounded-lg w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          Shared with {task.sharedWith.length} team{task.sharedWith.length > 1 ? "s" : ""}
        </div>
      )}

      {/* Actions */}
      <TaskActions
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
        onSmartAssign={onSmartAssign}
      />
    </div>
  );
};

export default TaskCard;
