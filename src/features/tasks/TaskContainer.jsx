import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskPresenter from "./TaskPresenter";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./taskSlice";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const { items, loading, saving } = useSelector(
    (state) => state.tasks
  );

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <TaskPresenter
      tasks={items}
      loading={loading}
      saving={saving}

      /* ADD / EDIT */
      onAdd={() => {
        setSelectedTask(null);
        setOpenFormModal(true);
      }}
      onEdit={(task) => {
        setSelectedTask(task);
        setOpenFormModal(true);
      }}

      /* DELETE */
      onDelete={(task) => {
        setSelectedTask(task);
        setOpenDeleteModal(true);
      }}

      /* MODALS */
      openFormModal={openFormModal}
      closeFormModal={() => setOpenFormModal(false)}

      openDeleteModal={openDeleteModal}
      closeDeleteModal={() => setOpenDeleteModal(false)}

      selectedTask={selectedTask}

      onCreate={(data) => dispatch(createTask(data))}
      onUpdate={(data) =>
        dispatch(updateTask({ taskId: selectedTask._id, data }))
      }
      onConfirmDelete={() => {
        dispatch(deleteTask(selectedTask._id));
        setOpenDeleteModal(false);
      }}
    />
  );
};

export default TaskContainer;
