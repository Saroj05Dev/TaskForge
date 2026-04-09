import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { fetchActivities } from "@/features/activity/activitySlice";
import {
  Pencil, PlusCircle, Trash2, UserPlus,
  MessageCircle, Paperclip, CheckCircle,
  TrendingUp, ArrowRight,
} from "lucide-react";

const ACTION_CONFIG = {
  created:          { icon: PlusCircle,    color: "text-blue-600",   bg: "bg-blue-50 dark:bg-blue-900/20"   },
  subtask_added:    { icon: PlusCircle,    color: "text-blue-600",   bg: "bg-blue-50 dark:bg-blue-900/20"   },
  updated:          { icon: Pencil,        color: "text-amber-600",  bg: "bg-amber-50 dark:bg-amber-900/20" },
  subtask_updated:  { icon: Pencil,        color: "text-amber-600",  bg: "bg-amber-50 dark:bg-amber-900/20" },
  deleted:          { icon: Trash2,        color: "text-red-500",    bg: "bg-red-50 dark:bg-red-900/20"     },
  member_invited:   { icon: UserPlus,      color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  comment_added:    { icon: MessageCircle, color: "text-teal-600",   bg: "bg-teal-50 dark:bg-teal-900/20"   },
  attachment_added: { icon: Paperclip,     color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  assigned:         { icon: CheckCircle,   color: "text-green-600",  bg: "bg-green-50 dark:bg-green-900/20" },
};

const getRelativeTime = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const TaskOverview = () => {
  const dispatch = useDispatch();
  const { total, completed } = useTasks();
  const activities = useSelector((state) => state.activity.items);

  useEffect(() => { dispatch(fetchActivities()); }, [dispatch]);

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const recent = activities.slice(0, 5);

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Task Overview</h2>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
            {progress}%
            <span className="text-xs font-normal text-gray-400 ml-1">done</span>
          </span>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{completed} of {total} tasks completed</p>
        </div>
      </div>

      {/* Activity feed */}
      <div className="px-6 py-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Recent Activity</p>

        {recent.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-400">No activity yet.</p>
            <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Create your first task to get started.</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {recent.map((activity) => {
              const cfg = ACTION_CONFIG[activity.actionType] ?? ACTION_CONFIG.updated;
              const Icon = cfg.icon;
              return (
                <li key={activity._id} className="group flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 cursor-default">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${cfg.bg}`}>
                    <Icon size={13} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{activity.user?.fullName}</span>{" "}
                      <span>{activity.actionType.replace(/_/g, " ")}</span>
                      {activity.task && (
                        <> <span className="text-gray-400">·</span>{" "}
                          <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{activity.task.title}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 mt-0.5 tabular-nums">{getRelativeTime(activity.createdAt)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="px-6 pb-5">
        <Link to="/activity" className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors group">
          View all activity
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-150" />
        </Link>
      </div>
    </div>
  );
};

export default TaskOverview;
