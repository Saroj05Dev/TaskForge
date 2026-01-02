import DashboardLayout from "@/layouts/DashboardLayout";
import TaskStats from "@/features/tasks/components/TaskStats";
import TaskOverview from "@/features/tasks/components/TaskOverview";
import KanbanBoard from "@/features/tasks/components/KanbanBoard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../features/tasks/taskSlice";
import TeamQuickActions from "../features/teams/TeamQuickActions";


const Dashboard = () => {

    const dispatch = useDispatch();
    // Fetching tasks everytime when Dashboard mounts
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted">
          Welcome to your collaborative task workspace
        </p>
      </div>

      {/* Stats */}
      <TaskStats />

      {/* Middle section */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <TaskOverview />
        </div>
        <TeamQuickActions />
      </div>

      {/* Kanban */}
      <div className="mt-8">
        <KanbanBoard />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
