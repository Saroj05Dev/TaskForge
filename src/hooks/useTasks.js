import { useSelector } from "react-redux";

export const useTasks = () => {
  const tasks = useSelector((state) => state.tasks.items);

  const total = tasks.length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completed = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  return {
    tasks,
    total,
    inProgress,
    completed,
  };
};
