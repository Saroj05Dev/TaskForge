import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "@/routes";
import { restoreSession } from "@/features/auth/login/loginSlice";
import { socket } from "@/helpers/socket";
import { prependActivity } from "@/features/activity/activitySlice";
import { fetchTasks } from "@/features/tasks/taskSlice";
import { fetchAllTeams } from "@/features/teams/teamsSlice";
import ServerWarmupIndicator from "@/components/ui/ServerWarmupIndicator";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // restore auth (cookie based)
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    socket.connect();

    // TASK EVENTS
    socket.on("taskCreated", (task) => {
      console.log("Task created:", task.title);
      dispatch(fetchTasks()); // Refresh task list
    });

    socket.on("taskUpdated", (task) => {
      console.log("Task updated:", task.title);
      dispatch(fetchTasks()); // Refresh task list
    });

    socket.on("taskDeleted", ({ taskId }) => {
      console.log("Task deleted:", taskId);
      dispatch(fetchTasks()); // Refresh task list
    });

    socket.on("taskAssigned", ({ _id, assignedUser }) => {
      console.log("Task assigned:", _id, "to", assignedUser.fullName);
      dispatch(fetchTasks()); // Refresh task list
    });

    socket.on("taskConflict", ({ message }) => {
      console.log("Conflict detected:", message);
      // Conflict modal will be shown via 409 response
    });

    // TEAM EVENTS
    socket.on("teamCreated", (team) => {
      console.log("Team created:", team.name);
      dispatch(fetchAllTeams()); // Refresh teams
    });

    socket.on("teamUpdated", (team) => {
      console.log("Team updated:", team.name);
      dispatch(fetchAllTeams()); // Refresh teams
    });

    socket.on("teamDeleted", ({ teamId }) => {
      console.log("Team deleted:", teamId);
      dispatch(fetchAllTeams()); // Refresh teams
    });

    socket.on("memberInvited", ({ teamId, member }) => {
      console.log("Member invited to team:", teamId);
      dispatch(fetchAllTeams()); // Refresh teams
    });

    socket.on("memberRemoved", ({ teamId, userId }) => {
      console.log("Member removed from team:", teamId);
      dispatch(fetchAllTeams()); // Refresh teams
    });

    // TASK SHARING EVENTS
    socket.on("taskShared", ({ taskId, teamId }) => {
      console.log("Task shared:", taskId, "with team:", teamId);
      dispatch(fetchTasks()); // Refresh tasks
    });

    socket.on("taskUnshared", ({ taskId, teamId }) => {
      console.log("Task unshared:", taskId, "from team:", teamId);
      dispatch(fetchTasks()); // Refresh tasks
    });

    // ACTIVITY LOG
    socket.on("actionLogged", (activity) => {
      dispatch(prependActivity(activity));
    });

    return () => {
      // Clean up all listeners
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
      socket.off("taskAssigned");
      socket.off("taskConflict");
      socket.off("teamCreated");
      socket.off("teamUpdated");
      socket.off("teamDeleted");
      socket.off("memberInvited");
      socket.off("memberRemoved");
      socket.off("taskShared");
      socket.off("taskUnshared");
      socket.off("actionLogged");
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <ServerWarmupIndicator />
      <AppRoutes />
    </>
  );
};

export default App;
