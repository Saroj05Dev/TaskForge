import { ListChecks, Plus } from "lucide-react";
import SubtaskItem from "./SubtaskItem";

const SubtasksList = ({
  subtasks,
  loading,
  creating,
  subtaskTitle,
  onTitleChange,
  onCreateSubtask,
  onStatusChange,
  onDelete,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onCreateSubtask();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="h-5 w-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">
          Subtasks ({subtasks.length})
        </h3>
      </div>

      {/* Add Subtask Input */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={subtaskTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a subtask..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={onCreateSubtask}
            disabled={creating || !subtaskTitle.trim()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">
              {creating ? "Adding..." : "Add"}
            </span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1.5">
          Press Enter to quickly add a subtask
        </p>
      </div>

      {/* Subtasks List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          Loading subtasks...
        </div>
      ) : subtasks.length === 0 ? (
        <div className="text-center py-8">
          <ListChecks className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No subtasks yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Break down this task into smaller steps
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask._id}
              subtask={subtask}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Progress Indicator */}
      {subtasks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">
              {subtasks.filter((s) => s.status === "Done").length} /{" "}
              {subtasks.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (subtasks.filter((s) => s.status === "Done").length /
                    subtasks.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubtasksList;
