import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit, onDelete, saving }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit} 
          onDelete={onDelete}
          saving={saving}
        />
      ))}
    </div>
  );
};

export default TaskList;
