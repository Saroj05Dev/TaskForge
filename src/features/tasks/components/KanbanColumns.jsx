import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

const COLUMN_CONFIG = {
  "Todo": {
    dot:         "bg-gray-400",
    badge:       "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    header:      "text-gray-700 dark:text-gray-300",
    bg:          "bg-gray-50 dark:bg-gray-900/50",
    border:      "border-gray-200 dark:border-gray-700",
    overBg:      "bg-gray-100 dark:bg-gray-800",
    overBorder:  "border-gray-400 dark:border-gray-500",
    emptyBorder: "border-gray-300 dark:border-gray-700",
    emptyText:   "text-gray-400 dark:text-gray-600",
  },
  "In Progress": {
    dot:         "bg-blue-500",
    badge:       "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    header:      "text-blue-700 dark:text-blue-400",
    bg:          "bg-blue-50/50 dark:bg-blue-900/10",
    border:      "border-blue-100 dark:border-blue-900",
    overBg:      "bg-blue-50 dark:bg-blue-900/30",
    overBorder:  "border-blue-400 dark:border-blue-500",
    emptyBorder: "border-blue-200 dark:border-blue-800",
    emptyText:   "text-blue-400 dark:text-blue-600",
  },
  "Done": {
    dot:         "bg-green-500",
    badge:       "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    header:      "text-green-700 dark:text-green-400",
    bg:          "bg-green-50/50 dark:bg-green-900/10",
    border:      "border-green-100 dark:border-green-900",
    overBg:      "bg-green-50 dark:bg-green-900/30",
    overBorder:  "border-green-400 dark:border-green-500",
    emptyBorder: "border-green-200 dark:border-green-800",
    emptyText:   "text-green-400 dark:text-green-600",
  },
};

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const cfg = COLUMN_CONFIG[title] ?? COLUMN_CONFIG["Todo"];

  return (
    <div className={`rounded-2xl border-2 flex flex-col min-h-[420px] cursor-default transition-colors duration-150
      ${isOver ? `${cfg.overBg} ${cfg.overBorder}` : `${cfg.bg} ${cfg.border}`}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 dark:border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <h3 className={`text-sm font-semibold ${cfg.header}`}>{title}</h3>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${cfg.badge}`}>
          {tasks.length}
        </span>
      </div>

      {/* Drop zone */}
      <div ref={setNodeRef} className="flex-1 p-3 space-y-2.5">
        {tasks.length === 0 ? (
          <div className={`flex items-center justify-center h-full min-h-[80px] rounded-xl border-2 border-dashed transition-colors duration-150
            ${isOver ? cfg.overBorder : cfg.emptyBorder}`}
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
