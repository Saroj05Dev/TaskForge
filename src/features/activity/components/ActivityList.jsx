import ActivityItem from "./ActivityItem";

const ActivityList = ({ activities }) => {
  if (!activities.length) {
    return <p className="text-sm text-gray-500">No activity yet</p>;
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem
          key={activity._id}
          activity={activity}
        />
      ))}
    </div>
  );
};

export default ActivityList;
