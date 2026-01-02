import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskPresenter from "./TaskPresenter";
import {
  fetchTasks,
  createTask,
  updateTask,
} from "./taskSlice";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(
    (state) => state.tasks
  );

  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreate = (data) => {
    dispatch(createTask(data));
  };

  const handleEdit = (task, data) => {
    dispatch(updateTask({ taskId: task._id, data }));
  };

  return (
    <TaskPresenter
      tasks={items}
      loading={loading}
      onAdd={() => {
        setEditTask(null);
        setOpenModal(true);
      }}
      onEdit={(task) => {
        setEditTask(task);
        setOpenModal(true);
      }}
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      editTask={editTask}
      onCreate={handleCreate}
      onUpdate={handleEdit}
    />
  );
};

export default TaskContainer;
