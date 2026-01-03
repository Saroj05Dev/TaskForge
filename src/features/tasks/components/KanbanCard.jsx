import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="rounded-lg border border-gray-200 p-3.5 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200 active:cursor-grabbing active:shadow-lg"
    >
      <p className="text-sm font-medium text-gray-900">{task.title}</p>
      {task.description && (
        <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
          {task.description}
        </p>
      )}
    </div>
  );
};

export default KanbanCard;
