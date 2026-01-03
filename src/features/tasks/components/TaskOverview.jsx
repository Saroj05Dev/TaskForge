import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { fetchActivities } from "@/features/activity/activitySlice";

import {
  Pencil,
  PlusCircle,
  Trash2,
  UserPlus,
  MessageCircle,
  Paperclip,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const getActionIcon = (type) => {
  switch (type) {
    case "created":
    case "subtask_added":
      return PlusCircle;
    case "updated":
    case "subtask_updated":
      return Pencil;
    case "deleted":
      return Trash2;
    case "member_invited":
      return UserPlus;
    case "comment_added":
      return MessageCircle;
    case "attachment_added":
      return Paperclip;
    case "assigned":
      return CheckCircle;
    default:
      return Pencil;
  }
};

const getRelativeTime = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const TaskOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { total, completed } = useTasks();
  const activities = useSelector((state) => state.activity.items);

  useEffect(() => {
    dispatch(fetchActivities()); // fetch once
  }, [dispatch]);

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Only last 5 actions for dashboard preview
  const recentFiveActivities = activities.slice(0, 5);

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Task Overview</h2>
        </div>
        <span className="text-sm font-medium text-gray-600">
          {progress}% completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-600">
          {completed} of {total} tasks completed
        </p>
      </div>

      {/* Recent Activity */}
      <h4 className="text-sm font-semibold text-gray-900 mb-3">
        Recent Activity
      </h4>

      {recentFiveActivities.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          No recent activity yet. Create your first task to get started.
        </p>
      ) : (
        <ul className="space-y-3">
          {recentFiveActivities.map((activity) => {
            const Icon = getActionIcon(activity.actionType);

            return (
              <li
                key={activity._id}
                className="flex gap-3 text-sm hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Icon size={14} className="text-blue-600" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-gray-900">
                    <strong className="font-semibold">
                      {activity.user?.fullName}
                    </strong>{" "}
                    <span className="text-gray-600">
                      {activity.actionType.replace("_", " ")}
                    </span>
                    {activity.task && (
                      <>
                        {" "}
                        <span className="text-gray-600">on</span>{" "}
                        <strong className="font-semibold">
                          {activity.task.title}
                        </strong>
                      </>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mt-0.5">
                    {getRelativeTime(activity.createdAt)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Show All Button */}
      <button
        onClick={() => navigate("/activity")}
        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all duration-150"
      >
        Show all actions →
      </button>
    </div>
  );
};

export default TaskOverview;
