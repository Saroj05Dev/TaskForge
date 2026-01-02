import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default TaskList;
