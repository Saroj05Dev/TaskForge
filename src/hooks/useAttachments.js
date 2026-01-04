import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addAttachment,
  deleteAttachment,
  fetchAttachments,
} from "@/features/tasks/attachmentsSlice";
import { useToast } from "@/contexts/ToastContext";

export const useAttachments = (taskId) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadAttachment = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      await dispatch(addAttachment({ taskId, file: selectedFile })).unwrap();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // Refresh to get complete attachment data
      dispatch(fetchAttachments(taskId));
      toast.success("Attachment uploaded successfully");
    } catch (error) {
      toast.error(error || "Failed to upload attachment");
    }
  };

  const handleDeleteAttachment = async (publicId) => {
    console.log("Deleting attachment:", { taskId, publicId });
    try {
      await dispatch(deleteAttachment({ taskId, publicId })).unwrap();
      toast.success("Attachment deleted successfully");
    } catch (error) {
      console.error("Delete attachment error:", error);
      toast.error(error || "Failed to delete attachment");
    }
  };

  return {
    fileInputRef,
    selectedFile,
    setSelectedFile,
    handleFileSelect,
    handleUploadAttachment,
    handleDeleteAttachment,
  };
};
