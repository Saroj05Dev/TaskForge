import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

const COLUMN_CONFIG = {
  "Todo": {
    dot:          "bg-gray-400",
    badge:        "bg-gray-100 text-gray-600",
    header:       "text-gray-700",
    bg:           "bg-gray-50",
    border:       "border-gray-200",
    overBg:       "bg-gray-100",
    overBorder:   "border-gray-400",
    emptyBorder:  "border-gray-300",
    emptyText:    "text-gray-400",
  },
  "In Progress": {
    dot:          "bg-blue-500",
    badge:        "bg-blue-50 text-blue-700",
    header:       "text-blue-700",
    bg:           "bg-blue-50/50",
    border:       "border-blue-100",
    overBg:       "bg-blue-50",
    overBorder:   "border-blue-400",
    emptyBorder:  "border-blue-200",
    emptyText:    "text-blue-400",
  },
  "Done": {
    dot:          "bg-green-500",
    badge:        "bg-green-50 text-green-700",
    header:       "text-green-700",
    bg:           "bg-green-50/50",
    border:       "border-green-100",
    overBg:       "bg-green-50",
    overBorder:   "border-green-400",
    emptyBorder:  "border-green-200",
    emptyText:    "text-green-400",
  },
};

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const cfg = COLUMN_CONFIG[title] ?? COLUMN_CONFIG["Todo"];

  return (
    <div
      className={`
        rounded-2xl border-2 flex flex-col min-h-[420px] cursor-default
        transition-colors duration-150
        ${isOver ? `${cfg.overBg} ${cfg.overBorder}` : `${cfg.bg} ${cfg.border}`}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <h3 className={`text-sm font-semibold ${cfg.header}`}>{title}</h3>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${cfg.badge}`}>
          {tasks.length}
        </span>
      </div>

      {/* Drop zone — ref goes here so the whole body is droppable */}
      <div ref={setNodeRef} className="flex-1 p-3 space-y-2.5">
        {tasks.length === 0 ? (
          <div
            className={`
              flex items-center justify-center h-full min-h-[80px] rounded-xl
              border-2 border-dashed transition-colors duration-150
              ${isOver ? cfg.overBorder : cfg.emptyBorder}
            `}
          >
            <p className={`text-xs font-medium ${isOver ? cfg.header : cfg.emptyText}`}>
              {isOver ? "Release to drop" : "Drop tasks here"}
            </p>
          </div>
        ) : (
          tasks.map((task) => <KanbanCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
