import { Sparkles, Edit2, Trash2, Share2 } from "lucide-react";

const btn = "flex-1 flex items-center justify-center gap-1.5 py-2 h-9 text-xs font-medium rounded-lg border transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap";

const TaskActions = ({ task, onEdit, onDelete, onShare, onSmartAssign, disabled }) => {
  const stop = (fn) => (e) => { e.stopPropagation(); fn(task); };

  return (
    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
      <button
        disabled={disabled}
        onClick={stop(onSmartAssign)}
        className={`${btn} text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300`}
        title="Smart Assign"
      >
        <Sparkles size={13} />
        <span className="hidden sm:inline">Assign</span>
      </button>

      {onShare && (
        <button
          onClick={stop(onShare)}
          disabled={disabled}
          className={`${btn} text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100 hover:border-teal-300`}
          title="Share with team"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Share</span>
        </button>
      )}

      <button
        disabled={disabled}
        onClick={stop(onEdit)}
        className={`${btn} text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300`}
        title="Edit task"
      >
        <Edit2 size={13} />
        <span className="hidden sm:inline">Edit</span>
      </button>

      <button
        disabled={disabled}
        onClick={stop(onDelete)}
        className={`${btn} text-red-600 bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300`}
        title="Delete task"
      >
        <Trash2 size={13} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
};

export default TaskActions;
