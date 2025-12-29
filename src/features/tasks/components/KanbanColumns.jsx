import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import EmptyState from "@/components/ui/EmptyState";

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="rounded-lg border border-border p-4 min-h-[320px]"
    >
      <div className="flex justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-muted">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <EmptyState message={`No tasks in ${title}`} />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;
