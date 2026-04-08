import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, User } from "lucide-react";

const PRIORITY_STYLES = {
  High:   "bg-red-50 text-red-600 border-red-100",
  Medium: "bg-amber-50 text-amber-600 border-amber-100",
  Low:    "bg-gray-50 text-gray-500 border-gray-100",
};

/**
 * isOverlay — rendered inside DragOverlay (no dnd hooks, just visual)
 */
const KanbanCard = ({ task, isOverlay = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  // When used as the overlay clone, skip the hook entirely
  if (isOverlay) {
    return <CardBody task={task} isDragging={false} isOverlay />;
  }

  const style = {
    transform: CSS.Translate.toString(transform),
    // No transition while dragging — feels snappier
    transition: isDragging ? "none" : "transform 200ms ease",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // Attach drag listeners to the whole card
      {...listeners}
      {...attributes}
      className="touch-none"
    >
      <CardBody task={task} isDragging={isDragging} />
    </div>
  );
};

/** Pure visual card — no dnd logic */
const CardBody = ({ task, isDragging, isOverlay }) => (
  <div
    className={`
      group relative bg-white rounded-xl border p-3.5 select-none
      transition-all duration-150
      ${isOverlay
        ? "border-blue-300 shadow-2xl rotate-2 scale-105 cursor-grabbing ring-2 ring-blue-200"
        : isDragging
          ? "border-blue-200 opacity-40 shadow-none cursor-grabbing"
          : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 cursor-grab active:cursor-grabbing"
      }
    `}
  >
    {/* Grip hint — visual only, no listeners */}
    <GripVertical
      size={13}
      className="absolute top-3 right-3 text-gray-300 group-hover:text-gray-400 transition-colors pointer-events-none"
    />

    {/* Priority badge */}
    {task.priority && (
      <span
        className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-md border mb-2 ${
          PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.Low
        }`}
      >
        {task.priority}
      </span>
    )}

    <p className="text-sm font-medium text-gray-900 leading-snug pr-5">
      {task.title}
    </p>

    {task.description && (
      <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
        {task.description}
      </p>
    )}

    {task.assignedUser && (
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-50">
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <User size={10} className="text-blue-600" />
        </div>
        <span className="text-[11px] text-gray-500 truncate">
          {task.assignedUser?.fullName ?? "Assigned"}
        </span>
      </div>
    )}
  </div>
);

export default KanbanCard;
