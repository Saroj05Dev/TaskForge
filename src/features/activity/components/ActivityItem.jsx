import { getActivityIcon } from "../utils/activityIcons";
import { formatDistanceToNow } from "date-fns";

const ActivityItem = ({ activity }) => {
  const Icon = getActivityIcon(activity.actionType);

  // Format action type to be more readable
  const formatActionType = (actionType) => {
    return actionType
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="flex gap-4 items-start p-4">
      {/* Icon with colored background */}
      <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon size={18} className="text-blue-600" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold text-gray-900">
            {activity.user?.fullName || "Unknown User"}
          </span>{" "}
          <span className="text-gray-600">
            {formatActionType(activity.actionType)}
          </span>
          {activity.task && (
            <>
              {" "}
              <span className="text-gray-600">on</span>{" "}
              <span className="font-medium text-gray-900">
                "{activity.task.title}"
              </span>
            </>
          )}
        </p>

        {/* Timestamp */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(activity.createdAt), {
              addSuffix: true,
            })}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">
            {new Date(activity.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
