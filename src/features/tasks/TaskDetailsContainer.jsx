import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "@/features/tasks/commentsSlice";
import { fetchAttachments } from "@/features/tasks/attachmentsSlice";
import { fetchSubtasks } from "@/features/tasks/subtasksSlice";
import { smartAssignTask } from "@/features/tasks/taskSlice";
import { useToast } from "@/contexts/ToastContext";
import { useComments } from "@/hooks/useComments";
import { useAttachments } from "@/hooks/useAttachments";
import { useSubtasks } from "@/hooks/useSubtasks";
import TaskDetailsPresenter from "./TaskDetailsPresenter";
import SmartAssignModal from "./components/SmartAssignModal";
import ConflictResolutionModal from "./components/ConflictResolutionModal";
import { socket } from "@/helpers/socket";

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

  const {
    items: subtasks,
    loading: subtasksLoading,
    creating: creatingSubtask,
  } = useSelector((state) => state.subtasks);

  // Custom hooks for comments, attachments, and subtasks
  const commentsHook = useComments(taskId);
  const attachmentsHook = useAttachments(taskId);
  const subtasksHook = useSubtasks(taskId);

  const [openSmartAssignModal, setOpenSmartAssignModal] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    if (taskId) {
      console.log("Fetching data for taskId:", taskId);
      dispatch(fetchComments(taskId));
      dispatch(fetchAttachments(taskId));
      dispatch(fetchSubtasks(taskId));
    }
  }, [dispatch, taskId]);

  // Socket.IO listeners for real-time updates
  useEffect(() => {
    if (!taskId) return;

    // Comment events
    const handleCommentAdded = (comment) => {
      if (comment.task === taskId) {
        dispatch(fetchComments(taskId));
      }
    };

    const handleCommentDeleted = ({ taskId: deletedTaskId }) => {
      if (deletedTaskId === taskId) {
        dispatch(fetchComments(taskId));
      }
    };

    // Attachment events
    const handleAttachmentAdded = (attachment) => {
      if (attachment.task === taskId) {
        dispatch(fetchAttachments(taskId));
      }
    };

    const handleAttachmentDeleted = ({ taskId: deletedTaskId }) => {
      if (deletedTaskId === taskId) {
        dispatch(fetchAttachments(taskId));
      }
    };

    // Subtask events
    const handleSubtaskAdded = (subtask) => {
      if (subtask.task === taskId) {
        dispatch(fetchSubtasks(taskId));
      }
    };

    const handleSubtaskUpdated = (subtask) => {
      if (subtask.task === taskId) {
        dispatch(fetchSubtasks(taskId));
      }
    };

    const handleSubtaskDeleted = ({ taskId: deletedTaskId }) => {
      if (deletedTaskId === taskId) {
        dispatch(fetchSubtasks(taskId));
      }
    };

    socket.on("commentAdded", handleCommentAdded);
    socket.on("commentDeleted", handleCommentDeleted);
    socket.on("attachmentAdded", handleAttachmentAdded);
    socket.on("attachmentDeleted", handleAttachmentDeleted);
    socket.on("subtaskAdded", handleSubtaskAdded);
    socket.on("subtaskUpdated", handleSubtaskUpdated);
    socket.on("subtaskDeleted", handleSubtaskDeleted);

    return () => {
      socket.off("commentAdded", handleCommentAdded);
      socket.off("commentDeleted", handleCommentDeleted);
      socket.off("attachmentAdded", handleAttachmentAdded);
      socket.off("attachmentDeleted", handleAttachmentDeleted);
      socket.off("subtaskAdded", handleSubtaskAdded);
      socket.off("subtaskUpdated", handleSubtaskUpdated);
      socket.off("subtaskDeleted", handleSubtaskDeleted);
    };
  }, [taskId, dispatch]);

  const handleSmartAssign = () => {
    setOpenSmartAssignModal(true);
  };

  const handleRefresh = () => {
    dispatch(fetchComments(taskId));
    dispatch(fetchAttachments(taskId));
    dispatch(fetchSubtasks(taskId));
    toast.info("Refreshed");
  };

  return (
    <>
      <TaskDetailsPresenter
        task={task}
        taskId={taskId}
        comments={comments}
        commentsLoading={commentsLoading}
        addingComment={addingComment}
        attachments={attachments}
        attachmentsLoading={attachmentsLoading}
        uploadingAttachment={uploadingAttachment}
        subtasks={subtasks}
        subtasksLoading={subtasksLoading}
        creatingSubtask={creatingSubtask}
        commentsHook={commentsHook}
        attachmentsHook={attachmentsHook}
        subtasksHook={subtasksHook}
        onSmartAssign={handleSmartAssign}
        onRefresh={handleRefresh}
      />

      <SmartAssignModal
        open={openSmartAssignModal}
        onClose={() => setOpenSmartAssignModal(false)}
        task={task}
      />

      <ConflictResolutionModal />
    </>
  );
};

export default TaskDetailsContainer;
