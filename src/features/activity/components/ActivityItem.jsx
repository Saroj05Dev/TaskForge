import { getActionConfig } from "../utils/activityIcons";
import { formatDistanceToNow, format } from "date-fns";

const ActivityItem = ({ activity }) => {
  const cfg  = getActionConfig(activity.actionType);
  const Icon = cfg.icon;

  const taskTitle = activity.task?.title || activity.taskTitle;
  const teamName  = activity.metadata?.teamName;

  return (
    <div className="group flex items-start gap-4 px-5 py-4 hover:bg-gray-50/70 transition-colors duration-150">
      {/* Icon */}
      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${cfg.bg}`}>
        <Icon size={15} className={cfg.color} />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 leading-snug">
          <span className="font-semibold text-gray-900">
            {activity.user?.fullName || "Unknown"}
          </span>{" "}
          <span className={`font-medium ${cfg.color}`}>{cfg.label.toLowerCase()}</span>
          {taskTitle && (
            <>
              {" "}
              <span className="text-gray-400">·</span>{" "}
              <span className="font-medium text-gray-800">"{taskTitle}"</span>
            </>
          )}
          {teamName && !taskTitle && (
            <>
              {" "}
              <span className="text-gray-400">·</span>{" "}
              <span className="font-medium text-gray-800">{teamName}</span>
            </>
          )}
        </p>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[11px] text-gray-400 tabular-nums">
            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
          </span>
          <span className="hidden sm:inline text-gray-300 text-[10px]">·</span>
          <span className="hidden sm:inline text-[11px] text-gray-400">
            {format(new Date(activity.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>
      </div>

      {/* Action type pill — visible on hover, hidden on xs */}
      <span className={`shrink-0 hidden md:inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${cfg.bg} ${cfg.color}`}>
        {cfg.label}
      </span>
    </div>
  );
};

export default ActivityItem;
