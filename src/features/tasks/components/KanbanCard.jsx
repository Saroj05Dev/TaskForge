import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, User } from "lucide-react";

const PRIORITY_STYLES = {
  High:   "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800",
  Medium: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800",
  Low:    "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700",
};

const KanbanCard = ({ task, isOverlay = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  if (isOverlay) return <CardBody task={task} isDragging={false} isOverlay />;

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? "none" : "transform 200ms ease",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
      <CardBody task={task} isDragging={isDragging} />
    </div>
  );
};

const CardBody = ({ task, isDragging, isOverlay }) => (
  <div className={`group relative bg-white dark:bg-gray-900 rounded-xl border p-3.5 select-none transition-all duration-150
    ${isOverlay
      ? "border-blue-300 shadow-2xl rotate-2 scale-105 cursor-grabbing ring-2 ring-blue-200"
      : isDragging
        ? "border-blue-200 opacity-40 shadow-none cursor-grabbing"
        : "border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 cursor-grab active:cursor-grabbing"
    }`}
  >
    <GripVertical size={13} className="absolute top-3 right-3 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors pointer-events-none" />

    {task.priority && (
      <span className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-md border mb-2 ${PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.Low}`}>
        {task.priority}
      </span>
    )}

    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug pr-5">{task.title}</p>

    {task.description && (
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{task.description}</p>
    )}

    {task.assignedUser && (
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
          <User size={10} className="text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
          {task.assignedUser?.fullName ?? "Assigned"}
        </span>
      </div>
    )}
  </div>
);

export default KanbanCard;
