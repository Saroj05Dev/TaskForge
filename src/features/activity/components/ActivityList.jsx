import { useMemo } from "react";
import ActivityItem from "./ActivityItem";
import { Activity } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";

const groupByDate = (activities) => {
  const groups = {};
  activities.forEach((a) => {
    const date = new Date(a.createdAt);
    let label;
    if (isToday(date))     label = "Today";
    else if (isYesterday(date)) label = "Yesterday";
    else label = format(date, "MMMM d, yyyy");

    if (!groups[label]) groups[label] = [];
    groups[label].push(a);
  });
  return groups;
};

const ActivityList = ({ activities }) => {
  const grouped = useMemo(() => groupByDate(activities || []), [activities]);
  const dateKeys = Object.keys(grouped);

  if (!activities?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mb-4">
          <Activity className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">No activity yet</h3>
        <p className="text-xs text-gray-400 text-center max-w-xs">
          When your team starts working on tasks, all actions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {dateKeys.map((dateLabel) => (
        <div key={dateLabel}>
          {/* Date group header */}
          <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-2.5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {dateLabel}
            </span>
            <span className="text-xs text-gray-400 tabular-nums">
              {grouped[dateLabel].length} event{grouped[dateLabel].length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-50">
            {grouped[dateLabel].map((activity) => (
              <ActivityItem key={activity._id} activity={activity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
