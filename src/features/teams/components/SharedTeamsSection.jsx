import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskTeams, unshareTask } from "@/features/teams/sharedTasksSlice";
import { useSharedTasks } from "@/hooks/useSharedTasks";
import { Users, Share2, X, Shield, Edit3, Eye } from "lucide-react";

const SharedTeamsSection = ({ taskId }) => {
  const dispatch = useDispatch();
  const { handleUnshareTask } = useSharedTasks();
  const taskTeams = useSelector(
    (state) => state.sharedTasks.taskTeams[taskId] || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTaskTeams = async () => {
      try {
        setLoading(true);
        await dispatch(fetchTaskTeams(taskId)).unwrap();
      } catch (error) {
        console.error("Failed to fetch task teams", error);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      loadTaskTeams();
    }
  }, [taskId, dispatch]);

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case "view":
        return <Eye size={14} className="text-gray-600" />;
      case "edit":
        return <Edit3 size={14} className="text-blue-600" />;
      case "full":
        return <Shield size={14} className="text-purple-600" />;
      default:
        return <Eye size={14} className="text-gray-600" />;
    }
  };

  const getPermissionColor = (permission) => {
    switch (permission) {
      case "view":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "edit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "full":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Shared With</h3>
        </div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="h-5 w-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">
          Shared With ({taskTeams.length})
        </h3>
      </div>

      {taskTeams.length === 0 ? (
        <div className="text-center py-6">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Not shared with any teams</p>
          <p className="text-xs text-gray-400 mt-1">
            Use the share button to collaborate
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {taskTeams.map((sharedTask) => (
            <div
              key={sharedTask._id}
              className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                  <Users size={18} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {sharedTask.team?.name || "Unknown Team"}
                  </p>
                  {sharedTask.team?.description && (
                    <p className="text-xs text-gray-500 truncate">
                      {sharedTask.team.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${getPermissionColor(
                        sharedTask.permissions
                      )}`}
                    >
                      {getPermissionIcon(sharedTask.permissions)}
                      {sharedTask.permissions}
                    </span>
                    {sharedTask.sharedBy && (
                      <span className="text-xs text-gray-500">
                        by {sharedTask.sharedBy.fullName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleUnshareTask(taskId, sharedTask.team._id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
                title="Unshare from team"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedTeamsSection;
