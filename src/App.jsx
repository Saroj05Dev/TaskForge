import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "@/routes";
import { restoreSession } from "@/features/auth/login/loginSlice";
import { socket } from "@/helpers/socket";
import { prependActivity } from "@/features/activity/activitySlice";
import { fetchTasks, updateTaskInList } from "@/features/tasks/taskSlice";
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

    socket.on("taskCreated", (task) => {
      console.log("Task created:", task.title);
      dispatch(fetchTasks());
    });

    socket.on("taskUpdated", (task) => {
      console.log("Task updated:", task.title);
      // Update only this specific task instead of fetching all
      dispatch(updateTaskInList(task));
    });

    socket.on("taskDeleted", ({ taskId }) => {
      console.log("Task deleted:", taskId);
      dispatch(fetchTasks());
    });

    socket.on("taskAssigned", ({ _id, assignedUser }) => {
      console.log("Task assigned:", _id, "to", assignedUser.fullName);
      dispatch(fetchTasks());
    });

    socket.on("taskConflict", ({ message }) => {
      console.log("Conflict detected:", message);
    });

    socket.on("teamCreated", (team) => {
      console.log("Team created:", team.name);
      dispatch(fetchAllTeams());
    });

    socket.on("teamUpdated", (team) => {
      console.log("Team updated:", team.name);
      dispatch(fetchAllTeams());
    });

    socket.on("teamDeleted", ({ teamId }) => {
      console.log("Team deleted:", teamId);
      dispatch(fetchAllTeams());
    });

    socket.on("memberInvited", ({ teamId, member }) => {
      console.log("Member invited to team:", teamId);
      dispatch(fetchAllTeams());
    });

    socket.on("memberRemoved", ({ teamId, userId }) => {
      console.log("Member removed from team:", teamId);
      dispatch(fetchAllTeams());
    });

    socket.on("taskShared", ({ taskId, teamId }) => {
      console.log("Task shared:", taskId, "with team:", teamId);
      dispatch(fetchTasks());
    });

    socket.on("taskUnshared", ({ taskId, teamId }) => {
      console.log("Task unshared:", taskId, "from team:", teamId);
      dispatch(fetchTasks());
    });

    socket.on("actionLogged", (activity) => {
      dispatch(prependActivity(activity));
    });

    return () => {
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
