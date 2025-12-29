import { getActivityIcon } from "../utils/activityIcons";

const ActivityItem = ({ activity }) => {
  const Icon = getActivityIcon(activity.actionType);

  return (
    <div className="flex gap-3 items-start text-sm">
      <Icon size={16} className="mt-1 text-gray-500" />

      <div>
        <p>
          <strong>{activity.user?.fullName}</strong>{" "}
          {activity.actionType.replace("_", " ")}
          {activity.task && (
            <>
              {" "}
              on <strong>{activity.task.title}</strong>
            </>
          )}
        </p>

        <span className="text-xs text-gray-400">
          {new Date(activity.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ActivityItem;
