import TaskCard from "./TaskCard";
import { FolderOpen } from "lucide-react";

const TaskList = ({ tasks, onEdit, onDelete, onShare, onSmartAssign }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mb-4">
          <FolderOpen className="h-7 w-7 text-gray-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">No tasks found</h3>
        <p className="text-xs text-gray-400 text-center max-w-xs">
          Try adjusting your search or filters, or create a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
          onSmartAssign={onSmartAssign}
        />
      ))}
    </div>
  );
};

export default TaskList;
