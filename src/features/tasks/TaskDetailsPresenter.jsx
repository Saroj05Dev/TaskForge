import DashboardLayout from "@/layouts/DashboardLayout";
import BackButton from "@/components/ui/BackButton";
import SubtasksList from "./components/SubtasksList";
import SharedTeamsSection from "@/features/teams/components/SharedTeamsSection";
import {
  FileText, User, Clock, MessageSquare, Paperclip,
  Send, Trash2, Download, Sparkles, RefreshCw, Upload, X, Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PRIORITY = {
  High:   "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
  Medium: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  Low:    "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
};
const STATUS = {
  "Done":        "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  "In Progress": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  "Todo":        "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, iconBg, title, count }) => (
  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50 dark:border-gray-800">
    <div className={`p-1.5 rounded-lg ${iconBg}`}>
      <Icon size={15} className="text-current" />
    </div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    {count !== undefined && (
      <span className="ml-auto text-xs font-semibold text-gray-400 dark:text-gray-500 tabular-nums">{count}</span>
    )}
  </div>
);

const inputCls = "w-full px-3.5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 cursor-text";

const TaskDetailsPresenter = ({
  task, taskId,
  comments, commentsLoading, addingComment,
  attachments, attachmentsLoading, uploadingAttachment,
  subtasks, subtasksLoading, creatingSubtask,
  commentsHook, attachmentsHook, subtasksHook,
  onSmartAssign, onRefresh,
}) => {
  if (!task) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-sm text-gray-400">Task not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <div className="p-2 bg-blue-600 rounded-xl shadow-sm">
              <FileText size={17} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task Details</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">View and manage task information</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button onClick={onSmartAssign} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-all duration-150 shadow-sm cursor-pointer">
              <Sparkles size={15} />Smart Assign
            </button>
            <button onClick={onRefresh} className="group flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150 cursor-pointer">
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Smart assign hint */}
        <div className="flex items-start gap-2.5 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl">
          <Sparkles size={14} className="text-purple-500 mt-0.5 shrink-0" />
          <p className="text-xs text-purple-700 dark:text-purple-400 leading-relaxed">
            <span className="font-semibold">Smart Assign</span> automatically picks the team member with the fewest active tasks to balance workload.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Task info */}
            <Card>
              <div className="px-5 py-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug">{task.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${PRIORITY[task.priority] ?? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"}`}>
                    {task.priority} Priority
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS[task.status] ?? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                  {task.description || "No description provided."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-50 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <User size={13} className="text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {task.assignedUser ? task.assignedUser.fullName : "Unassigned"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={13} className="text-gray-400" />
                    Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                  </div>
                  {task.updatedAt && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={13} className="text-gray-400" />
                      Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Comments */}
            <Card>
              <SectionHeader icon={MessageSquare} iconBg="bg-blue-50 dark:bg-blue-900/20 text-blue-600" title="Comments" count={comments.length} />
              <div className="px-5 py-4 space-y-4">
                <div className="space-y-2">
                  <textarea value={commentsHook.commentText} onChange={(e) => commentsHook.setCommentText(e.target.value)} placeholder="Write a comment..." rows={3} className={`${inputCls} resize-none`} />
                  <button onClick={commentsHook.handleAddComment} disabled={addingComment || !commentsHook.commentText.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                    <Send size={14} />{addingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>

                {commentsLoading ? (
                  <p className="text-xs text-gray-400 text-center py-6">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">No comments yet. Be the first!</p>
                ) : (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div key={comment._id} className="group flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150">
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                          {comment.userId?.fullName?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{comment.userId?.fullName || "Unknown"}</span>
                            <span className="text-[10px] text-gray-400">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.comment}</p>
                        </div>
                        <button onClick={() => commentsHook.handleDeleteComment(comment._id)}
                          className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150 opacity-0 group-hover:opacity-100 cursor-pointer shrink-0">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <SubtasksList subtasks={subtasks} loading={subtasksLoading} creating={creatingSubtask}
              subtaskTitle={subtasksHook.subtaskTitle} onTitleChange={subtasksHook.setSubtaskTitle}
              onCreateSubtask={subtasksHook.handleCreateSubtask} onStatusChange={subtasksHook.handleUpdateSubtask}
              onDelete={subtasksHook.handleDeleteSubtask} />
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <Card>
              <SectionHeader icon={Paperclip} iconBg="bg-amber-50 dark:bg-amber-900/20 text-amber-600" title="Attachments" count={attachments.length} />
              <div className="px-5 py-4 space-y-3">
                <div>
                  <input ref={attachmentsHook.fileInputRef} type="file" onChange={attachmentsHook.handleFileSelect} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 cursor-pointer">
                    <Upload size={15} className="text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {attachmentsHook.selectedFile ? attachmentsHook.selectedFile.name : "Click to upload a file"}
                    </span>
                  </label>
                  {attachmentsHook.selectedFile && (
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={attachmentsHook.handleUploadAttachment} disabled={uploadingAttachment}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-xl hover:bg-blue-700 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                        {uploadingAttachment ? "Uploading..." : "Upload"}
                      </button>
                      <button onClick={() => { attachmentsHook.setSelectedFile(null); if (attachmentsHook.fileInputRef.current) attachmentsHook.fileInputRef.current.value = ""; }}
                        disabled={uploadingAttachment}
                        className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-150 disabled:opacity-40 cursor-pointer">
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>

                {attachmentsLoading ? (
                  <p className="text-xs text-gray-400 text-center py-4">Loading...</p>
                ) : attachments.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No attachments yet.</p>
                ) : (
                  <div className="space-y-2">
                    {attachments.map((att) => (
                      <div key={att._id} className="group flex items-center gap-2 p-2.5 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150">
                        <Paperclip size={13} className="text-gray-400 shrink-0" />
                        <a href={att.fileUrl} target="_blank" rel="noopener noreferrer"
                          className="flex-1 text-xs text-blue-600 dark:text-blue-400 hover:underline truncate cursor-pointer">
                          {att.filename || "Attachment"}
                        </a>
                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a href={att.fileUrl} download className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer" title="Download">
                            <Download size={13} />
                          </a>
                          <button onClick={() => attachmentsHook.handleDeleteAttachment(att.publicId)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer" title="Delete">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <SharedTeamsSection taskId={taskId} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetailsPresenter;
