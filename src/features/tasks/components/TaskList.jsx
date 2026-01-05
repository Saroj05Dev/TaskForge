import TaskCard from "./TaskCard";
import { FolderOpen } from "lucide-react";

const TaskList = ({ tasks, onEdit, onDelete, onShare }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          No Tasks Yet
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          Get started by creating your first task. Click the "Add Task" button
          above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
        />
      ))}
    </div>
  );
};

export default TaskList;
