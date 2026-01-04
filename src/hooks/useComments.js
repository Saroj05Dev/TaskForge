import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  fetchComments,
} from "@/features/tasks/commentsSlice";
import { useToast } from "@/contexts/ToastContext";

export const useComments = (taskId) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      await dispatch(addComment({ taskId, content: commentText })).unwrap();
      setCommentText("");
      // Refresh to get populated user data
      dispatch(fetchComments(taskId));
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(error || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete comment");
    }
  };

  return {
    commentText,
    setCommentText,
    handleAddComment,
    handleDeleteComment,
  };
};
