import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTasks } from "@/hooks/useTasks";
import { useTeams } from "@/hooks/useTeams";
import {
  updateTaskStatus,
  persistTaskStatus,
} from "@/features/tasks/taskSlice";
import KanbanColumn from "./KanbanColumns";
import KanbanCard from "./KanbanCard";
import { canEditTask } from "@/utils/taskPermissions";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks } = useTasks();
  const { teams } = useTeams();
  const authUser = useSelector((state) => state.auth.user);
  const currentUserId = authUser?.id || authUser?._id;
  const [activeTask, setActiveTask] = useState(null);

  const userTeamIds = teams.map((team) => team._id);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Small threshold so a click doesn't accidentally start a drag
      activationConstraint: { distance: 8 },
    })
  );

  const editableTasks = tasks.filter((task) =>
    canEditTask(task, currentUserId, userTeamIds)
  );

  const COLUMNS = ["Todo", "In Progress", "Done"];

  const handleDragStart = (event) => {
    const task = editableTasks.find((t) => t._id === event.active.id);
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // Only update if dropped on a valid column and status actually changed
    if (!COLUMNS.includes(newStatus)) return;
    const task = editableTasks.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;

    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
    dispatch(persistTaskStatus({ id: taskId, status: newStatus }));
  };

  const handleDragCancel = () => setActiveTask(null);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col}
            id={col}
            title={col}
            tasks={editableTasks.filter((t) => t.status === col)}
          />
        ))}
      </div>

      {/* Floating card that follows the cursor while dragging */}
      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeTask ? <KanbanCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
