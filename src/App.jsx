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

    return () => {
      socket.off("actionLogged");
      socket.disconnect();
    };
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
