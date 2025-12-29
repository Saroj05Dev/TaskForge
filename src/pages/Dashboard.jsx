import DashboardLayout from "@/layouts/DashboardLayout";
import TaskStats from "@/features/tasks/components/TaskStats";
import TaskOverview from "@/features/tasks/components/TaskOverview";
import KanbanBoard from "@/features/tasks/components/KanbanBoard";
import TeamQuickActions from "@/features/teams/components/TeamQuickActions";


const Dashboard = () => {
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
