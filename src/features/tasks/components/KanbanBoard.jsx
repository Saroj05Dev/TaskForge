import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useDispatch } from "react-redux";

import { useTasks } from "@/hooks/useTasks";
import {
  updateTaskStatus,
  persistTaskStatus,
} from "@/features/tasks/taskSlice";
import KanbanColumn from "./KanbanColumns";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // 1️ Optimistic UI update
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));

    // 2️ Persist change to backend
    dispatch(persistTaskStatus({ id: taskId, status: newStatus }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-6">
        <KanbanColumn
          id="Todo"
          title="Todo"
          tasks={tasks.filter((t) => t.status === "Todo")}
        />
        <KanbanColumn
          id="In Progress"
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "In Progress")}
        />
        <KanbanColumn
          id="Done"
          title="Done"
          tasks={tasks.filter((t) => t.status === "Done")}
        />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
