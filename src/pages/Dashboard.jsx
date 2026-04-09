import DashboardLayout from "@/layouts/DashboardLayout";
import TaskStats from "@/features/tasks/components/TaskStats";
import TaskOverview from "@/features/tasks/components/TaskOverview";
import KanbanBoard from "@/features/tasks/components/KanbanBoard";
import TeamQuickActions from "../features/teams/TeamQuickActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../features/tasks/taskSlice";
import { fetchAllTeams } from "../features/teams/teamsSlice";
import { fetchActivities } from "../features/activity/activitySlice";
import { RefreshCw, LayoutDashboard } from "lucide-react";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchAllTeams());
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchTasks());
    dispatch(fetchAllTeams());
    dispatch(fetchActivities());
  };

  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {getGreeting()}, {firstName} 👋
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Here's what's happening with your tasks today.
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 shadow-sm self-start sm:self-auto"
          >
            <RefreshCw
              size={14}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Refresh
          </button>
        </div>

        {/* ── Stats ── */}
        <section>
          <TaskStats />
        </section>

        {/* ── Overview + Team ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TaskOverview />
          </div>
          <div>
            <TeamQuickActions />
          </div>
        </section>

        {/* ── Kanban ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-500">Kanban Board</h2>
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">Drag and drop to update task status</p>
            </div>
          </div>
          <KanbanBoard />
        </section>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
