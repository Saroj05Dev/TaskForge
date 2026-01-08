import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";

import { useTasks } from "@/hooks/useTasks";
import { useTeams } from "@/hooks/useTeams";
import {
  updateTaskStatus,
  persistTaskStatus,
} from "@/features/tasks/taskSlice";
import KanbanColumn from "./KanbanColumns";
import { canEditTask } from "@/utils/taskPermissions";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks } = useTasks();
  const { teams } = useTeams();
  const authUser = useSelector((state) => state.auth.user);
  const currentUserId = authUser?.id || authUser?._id;

  // Get list of team IDs the user belongs to
  const userTeamIds = teams.map((team) => team._id);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Filter tasks to only show those with edit or full access
  // View-only tasks should not appear in Kanban since they can't be dragged
  const editableTasks = tasks.filter((task) =>
    canEditTask(task, currentUserId, userTeamIds)
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <KanbanColumn
          id="Todo"
          title="Todo"
          tasks={editableTasks.filter((t) => t.status === "Todo")}
        />
        <KanbanColumn
          id="In Progress"
          title="In Progress"
          tasks={editableTasks.filter((t) => t.status === "In Progress")}
        />
        <KanbanColumn
          id="Done"
          title="Done"
          tasks={editableTasks.filter((t) => t.status === "Done")}
        />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
