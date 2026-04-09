import { Sparkles, Edit2, Trash2, Share2 } from "lucide-react";

const btn = "flex-1 flex items-center justify-center gap-1.5 py-2 h-9 text-xs font-medium rounded-lg border transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap";

const TaskActions = ({ task, onEdit, onDelete, onShare, onSmartAssign, disabled }) => {
  const stop = (fn) => (e) => { e.stopPropagation(); fn(task); };

  return (
    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
      <button disabled={disabled} onClick={stop(onSmartAssign)} title="Smart Assign"
        className={`${btn} text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40`}>
        <Sparkles size={13} /><span className="hidden sm:inline">Assign</span>
      </button>

      {onShare && (
        <button onClick={stop(onShare)} disabled={disabled} title="Share with team"
          className={`${btn} text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40`}>
          <Share2 size={13} /><span className="hidden sm:inline">Share</span>
        </button>
      )}

      <button disabled={disabled} onClick={stop(onEdit)} title="Edit task"
        className={`${btn} text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40`}>
        <Edit2 size={13} /><span className="hidden sm:inline">Edit</span>
      </button>

      <button disabled={disabled} onClick={stop(onDelete)} title="Delete task"
        className={`${btn} text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40`}>
        <Trash2 size={13} /><span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
};

export default TaskActions;
