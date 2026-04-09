import { ListChecks, Plus } from "lucide-react";
import SubtaskItem from "./SubtaskItem";

const SubtasksList = ({ subtasks, loading, creating, subtaskTitle, onTitleChange, onCreateSubtask, onStatusChange, onDelete }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onCreateSubtask(); }
  };

  const done = subtasks.filter((s) => s.status === "Done").length;
  const pct  = subtasks.length ? Math.round((done / subtasks.length) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <ListChecks size={15} className="text-cyan-600 dark:text-cyan-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Subtasks</h3>
        <span className="ml-auto text-xs font-semibold text-gray-400 dark:text-gray-500 tabular-nums">{subtasks.length}</span>
      </div>

      {/* Add input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={subtaskTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a subtask..."
          className="flex-1 px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all cursor-text"
        />
        <button onClick={onCreateSubtask} disabled={creating || !subtaskTitle.trim()}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
          <Plus size={15} />
          <span className="hidden sm:inline">{creating ? "Adding..." : "Add"}</span>
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-xs text-gray-400 text-center py-6">Loading subtasks...</p>
      ) : subtasks.length === 0 ? (
        <div className="text-center py-8">
          <ListChecks className="h-10 w-10 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No subtasks yet</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Break this task into smaller steps</p>
        </div>
      ) : (
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <SubtaskItem key={subtask._id} subtask={subtask} onStatusChange={onStatusChange} onDelete={onDelete} />
          ))}
        </div>
      )}

      {/* Progress */}
      {subtasks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-500 dark:text-gray-400">Progress</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100 tabular-nums">{done} / {subtasks.length}</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubtasksList;
