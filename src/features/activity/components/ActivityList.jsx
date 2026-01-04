import ActivityItem from "./ActivityItem";
import { FileX } from "lucide-react";

const ActivityList = ({ activities }) => {
  if (!activities || !activities.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileX className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          No Activity Yet
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          When your team starts working on tasks, you'll see all the activity
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {activities.map((activity, index) => (
        <div
          key={activity._id}
          className={`${
            index === 0 ? "" : ""
          } hover:bg-gray-50 transition-colors duration-150`}
        >
          <ActivityItem activity={activity} />
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
