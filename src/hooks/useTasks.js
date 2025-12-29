import { useSelector } from "react-redux";

export const useTasks = () => {
  const tasks = useSelector((state) => state.tasks.items);

  const total = tasks.length;
  const inProgress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const completed = tasks.filter(
    (t) => t.status === "Done"
  ).length;

  return { tasks, total, inProgress, completed };
};
