import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "@/features/activity/activitySlice";
import ActivityList from "@/features/activity/components/ActivityList";
import DashboardLayout from "@/layouts/DashboardLayout";
import Loader from "../components/ui/Loader";
import { RefreshCw, History } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

const Activity = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(fetchActivities(20));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchActivities(20));
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <div className="p-2 bg-purple-100 rounded-lg">
            <History className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Activity Log
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">
              Track all team activities and changes
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <RefreshCw size={16} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Activity List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <ActivityList activities={items} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Activity;
