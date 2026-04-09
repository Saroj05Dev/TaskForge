import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskTeams } from "@/features/teams/sharedTasksSlice";
import { useSharedTasks } from "@/hooks/useSharedTasks";
import { Users, Share2, X, Shield, Edit3, Eye } from "lucide-react";

const PERMISSION_CONFIG = {
  view: { icon: Eye,        color: "text-gray-600 dark:text-gray-400",   badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700" },
  edit: { icon: Edit3,      color: "text-blue-600 dark:text-blue-400",   badge: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  full: { icon: Shield,     color: "text-purple-600 dark:text-purple-400", badge: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
};

const SharedTeamsSection = ({ taskId }) => {
  const dispatch = useDispatch();
  const { handleUnshareTask } = useSharedTasks();
  const taskTeams = useSelector((state) => state.sharedTasks.taskTeams[taskId] || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    dispatch(fetchTaskTeams(taskId)).unwrap()
      .catch((e) => console.error("Failed to fetch task teams", e))
      .finally(() => setLoading(false));
  }, [taskId, dispatch]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50 dark:border-gray-800">
        <div className="p-1.5 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <Share2 size={15} className="text-teal-600 dark:text-teal-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Shared With</h3>
        <span className="ml-auto text-xs font-semibold text-gray-400 dark:text-gray-500 tabular-nums">{taskTeams.length}</span>
      </div>

      <div className="px-5 py-4">
        {loading ? (
          <p className="text-xs text-gray-400 text-center py-4">Loading...</p>
        ) : taskTeams.length === 0 ? (
          <div className="text-center py-6">
            <Users className="h-10 w-10 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Not shared with any teams</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Use the share button to collaborate</p>
          </div>
        ) : (
          <div className="space-y-2">
            {taskTeams.map((sharedTask) => {
              const perm = PERMISSION_CONFIG[sharedTask.permissions] ?? PERMISSION_CONFIG.view;
              const PermIcon = perm.icon;
              return (
                <div key={sharedTask._id}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg shrink-0">
                      <Users size={15} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {sharedTask.team?.name || "Unknown Team"}
                      </p>
                      {sharedTask.team?.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{sharedTask.team.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${perm.badge}`}>
                          <PermIcon size={10} />{sharedTask.permissions}
                        </span>
                        {sharedTask.sharedBy && (
                          <span className="text-[11px] text-gray-400 dark:text-gray-500">by {sharedTask.sharedBy.fullName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleUnshareTask(taskId, sharedTask.team._id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer shrink-0" title="Unshare">
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedTeamsSection;
