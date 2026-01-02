import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "@/features/activity/activitySlice";
import ActivityList from "@/features/activity/components/ActivityList";
import DashboardLayout from "@/layouts/DashboardLayout";
import Loader from "../components/ui/Loader";

const Activity = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(
    (state) => state.activity
  );

  useEffect(() => {
    dispatch(fetchActivities(20));
  }, [dispatch]);

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold mb-4">
        Activity Log
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <ActivityList activities={items} />
      )}
    </DashboardLayout>
  );
};

export default Activity;
