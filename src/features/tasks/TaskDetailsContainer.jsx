import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "@/features/tasks/commentsSlice";
import { fetchAttachments } from "@/features/tasks/attachmentsSlice";
import { smartAssignTask } from "@/features/tasks/taskSlice";
import { useToast } from "@/contexts/ToastContext";
import { useComments } from "@/hooks/useComments";
import { useAttachments } from "@/hooks/useAttachments";
import TaskDetailsPresenter from "./TaskDetailsPresenter";

const TaskDetailsContainer = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  // Get task from Redux store
  const task = useSelector((state) =>
    state.tasks.items.find((t) => t._id === taskId)
  );

  const {
    items: comments,
    loading: commentsLoading,
    adding: addingComment,
  } = useSelector((state) => state.comments);

  const {
    items: attachments,
    loading: attachmentsLoading,
    uploading: uploadingAttachment,
  } = useSelector((state) => state.attachments);

  // Custom hooks for comments and attachments
  const commentsHook = useComments(taskId);
  const attachmentsHook = useAttachments(taskId);

  // Fetch data on mount
  useEffect(() => {
    if (taskId) {
      console.log("Fetching data for taskId:", taskId);
      dispatch(fetchComments(taskId));
      dispatch(fetchAttachments(taskId));
    }
  }, [dispatch, taskId]);

  const handleSmartAssign = async () => {
    try {
      await dispatch(smartAssignTask(taskId)).unwrap();
      toast.success("Task assigned successfully");
    } catch (error) {
      toast.error(error || "Failed to assign task");
    }
  };

  const handleRefresh = () => {
    dispatch(fetchComments(taskId));
    dispatch(fetchAttachments(taskId));
    toast.info("Refreshed");
  };

  return (
    <TaskDetailsPresenter
      task={task}
      taskId={taskId}
      comments={comments}
      commentsLoading={commentsLoading}
      addingComment={addingComment}
      attachments={attachments}
      attachmentsLoading={attachmentsLoading}
      uploadingAttachment={uploadingAttachment}
      commentsHook={commentsHook}
      attachmentsHook={attachmentsHook}
      onSmartAssign={handleSmartAssign}
      onRefresh={handleRefresh}
    />
  );
};

export default TaskDetailsContainer;
