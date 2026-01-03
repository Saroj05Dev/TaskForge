import DashboardLayout from "@/layouts/DashboardLayout";
import TaskStats from "@/features/tasks/components/TaskStats";
import TaskOverview from "@/features/tasks/components/TaskOverview";
import KanbanBoard from "@/features/tasks/components/KanbanBoard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../features/tasks/taskSlice";
import TeamQuickActions from "../features/teams/TeamQuickActions";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome to your collaborative task workspace
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Kanban Board</h2>
          <p className="text-sm text-gray-600">
            Drag and drop tasks to update status • 3 tasks
          </p>
        </div>
        <KanbanBoard />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
