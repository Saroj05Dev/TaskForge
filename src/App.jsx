import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "@/routes";
import { restoreSession } from "@/features/auth/login/loginSlice";
import { socket } from "@/helpers/socket";
import { prependActivity } from "@/features/activity/activitySlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // restore auth (cookie based)
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    socket.connect();

    socket.on("actionLogged", (activity) => {
      dispatch(prependActivity(activity));
    });

    // Listen for task conflicts
    socket.on("taskConflict", ({ taskId, serverVersion, message }) => {
      console.log("Conflict detected:", message);
      // Conflict modal will be shown via 409 response
    });

    // Listen for task updates
    socket.on("taskUpdated", (updatedTask) => {
      console.log("Task updated:", updatedTask);
      // Task will be updated in Redux via normal flow
    });

    return () => {
      socket.off("actionLogged");
      socket.off("taskConflict");
      socket.off("taskUpdated");
      socket.disconnect();
    };
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
