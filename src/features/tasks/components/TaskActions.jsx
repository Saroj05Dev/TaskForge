import { useDispatch } from "react-redux";
import { deleteTask, smartAssignTask } from "../taskSlice";

const TaskActions = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "8px" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(smartAssignTask(task._id));
        }}
      >
        Smart Assign
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteTask(task._id));
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskActions;
