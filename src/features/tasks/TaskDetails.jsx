import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { taskId } = useParams();

  return (
    <div>
      <h2>Task Details</h2>
      <p>Task ID: {taskId}</p>

      {/* Later:
        - description
        - assignees
        - comments
        - activity log
      */}
    </div>
  );
};

export default TaskDetails;
