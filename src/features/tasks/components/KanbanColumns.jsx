import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import EmptyState from "@/components/ui/EmptyState";

const columnColors = {
  Todo: "border-gray-300 bg-gray-50",
  "In Progress": "border-orange-300 bg-orange-50",
  Done: "border-green-300 bg-green-50",
};

const headerColors = {
  Todo: "text-gray-700",
  "In Progress": "text-orange-700",
  Done: "text-green-700",
};

const badgeColors = {
  Todo: "bg-gray-200 text-gray-700",
  "In Progress": "bg-orange-200 text-orange-700",
  Done: "bg-green-200 text-green-700",
};

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border-2 ${
        columnColors[title] || "border-gray-300 bg-gray-50"
      } p-4 min-h-[400px] transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`font-semibold text-sm ${
            headerColors[title] || "text-gray-700"
          }`}
        >
          {title}
        </h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            badgeColors[title] || "bg-gray-200 text-gray-700"
          }`}
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <EmptyState message={`No tasks in ${title}`} />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <KanbanCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;
