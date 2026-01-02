import TaskList from "./components/TaskList";
import Loader from "@/components/ui/Loader";

const TaskPresenter = ({ tasks, loading }) => {
  if (loading) return <Loader />;

  return (
    <div>
      <h2>Tasks</h2>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPresenter;
