import DashboardLayout from "@/layouts/DashboardLayout";
import BackButton from "@/components/ui/BackButton";
import SubtasksList from "./components/SubtasksList";
import SharedTeamsSection from "@/features/teams/components/SharedTeamsSection";
import {
  FileText,
  User,
  Clock,
  MessageSquare,
  Paperclip,
  Send,
  Trash2,
  Download,
  Sparkles,
  RefreshCw,
  Upload,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const TaskDetailsPresenter = ({
  task,
  taskId,
  comments,
  commentsLoading,
  addingComment,
  attachments,
  attachmentsLoading,
  uploadingAttachment,
  subtasks,
  subtasksLoading,
  creatingSubtask,
  commentsHook,
  attachmentsHook,
  subtasksHook,
  onSmartAssign,
  onRefresh,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-700 bg-red-100 border-red-200";
      case "Medium":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "Low":
        return "text-green-700 bg-green-100 border-green-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "text-green-700 bg-green-100";
      case "In Progress":
        return "text-blue-700 bg-blue-100";
      case "Todo":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  if (!task) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Task not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Task Details
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">
              View and manage task information
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            onClick={onSmartAssign}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm"
          >
            <Sparkles size={16} />
            <span>Smart Assign</span>
          </button>
          <button
            onClick={onRefresh}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Smart Assign Info */}
      <div className="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
          <p className="text-xs md:text-sm text-purple-700">
            <span className="font-semibold">Smart Assign</span> automatically
            picks a user with fewer active tasks to balance the workload.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Task Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {task.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority} Priority
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            <p className="text-gray-700 mb-6">
              {task.description || "No description provided"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>
                  {task.assignedUser
                    ? task.assignedUser.fullName
                    : "Unassigned"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  Created{" "}
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                value={commentsHook.commentText}
                onChange={(e) => commentsHook.setCommentText(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
              <button
                onClick={commentsHook.handleAddComment}
                disabled={addingComment || !commentsHook.commentText.trim()}
                className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {addingComment ? "Adding..." : "Add Comment"}
              </button>
            </div>

            {/* Comments List */}
            {commentsLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading comments...
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No comments yet
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">
                            {comment.userId?.fullName || "Unknown User"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {comment.comment}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          commentsHook.handleDeleteComment(comment._id)
                        }
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtasks Section */}
          <SubtasksList
            subtasks={subtasks}
            loading={subtasksLoading}
            creating={creatingSubtask}
            subtaskTitle={subtasksHook.subtaskTitle}
            onTitleChange={subtasksHook.setSubtaskTitle}
            onCreateSubtask={subtasksHook.handleCreateSubtask}
            onStatusChange={subtasksHook.handleUpdateSubtask}
            onDelete={subtasksHook.handleDeleteSubtask}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Attachments Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Paperclip className="h-5 w-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">
                Attachments ({attachments.length})
              </h3>
            </div>

            {/* Upload Attachment */}
            <div className="mb-4">
              <input
                ref={attachmentsHook.fileInputRef}
                type="file"
                onChange={attachmentsHook.handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
              >
                <Upload size={18} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {attachmentsHook.selectedFile
                    ? attachmentsHook.selectedFile.name
                    : "Choose file"}
                </span>
              </label>
              {attachmentsHook.selectedFile && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={attachmentsHook.handleUploadAttachment}
                    disabled={uploadingAttachment}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingAttachment ? "Uploading..." : "Upload"}
                  </button>
                  <button
                    onClick={() => {
                      attachmentsHook.setSelectedFile(null);
                      if (attachmentsHook.fileInputRef.current)
                        attachmentsHook.fileInputRef.current.value = "";
                    }}
                    disabled={uploadingAttachment}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Attachments List */}
            {attachmentsLoading ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                Loading attachments...
              </div>
            ) : attachments.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No attachments yet
              </div>
            ) : (
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment._id}
                    className="flex items-center justify-between gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Paperclip size={16} className="text-gray-500 shrink-0" />
                      <a
                        href={attachment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline truncate"
                      >
                        {attachment.filename || "Attachment"}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={attachment.fileUrl}
                        download
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Download size={16} />
                      </a>
                      <button
                        onClick={() =>
                          attachmentsHook.handleDeleteAttachment(
                            attachment.publicId
                          )
                        }
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shared Teams Section */}
          <SharedTeamsSection taskId={taskId} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetailsPresenter;
