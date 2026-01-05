import DashboardLayout from "@/layouts/DashboardLayout";
import TaskStats from "@/features/tasks/components/TaskStats";
import TaskOverview from "@/features/tasks/components/TaskOverview";
import KanbanBoard from "@/features/tasks/components/KanbanBoard";
import TeamQuickActions from "../features/teams/TeamQuickActions";
import TeamSelector from "@/features/teams/components/TeamSelector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useTeams } from "@/hooks/useTeams";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { teams, currentTeam, selectTeam } = useTeams();

  // Fetching tasks everytime when Dashboard mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchTasks());
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Title and Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Welcome to your collaborative task workspace
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Team Selector Row */}
        {teams && teams.length > 0 && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 shrink-0">
              Active Team:
            </label>
            <TeamSelector
              teams={teams}
              currentTeam={currentTeam}
              onSelectTeam={selectTeam}
            />
          </div>
        )}
      </div>

      {/* Stats */}
      <TaskStats />

      {/* Middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TaskOverview />
        </div>
        <TeamQuickActions />
      </div>

      {/* Kanban */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Kanban Board
          </h2>
          <p className="text-xs md:text-sm text-gray-600">
            Drag and drop tasks to update status
          </p>
        </div>
        <KanbanBoard />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
