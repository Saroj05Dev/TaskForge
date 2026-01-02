import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskPresenter from "./TaskPresenter";
import { fetchTasks } from "./taskSlice";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <TaskPresenter tasks={items} loading={loading} />
  );
};

export default TaskContainer;
