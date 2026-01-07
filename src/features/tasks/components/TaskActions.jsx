import { Sparkles, Edit2, Trash2, Share2 } from "lucide-react";

const TaskActions = ({
  task,
  onEdit,
  onDelete,
  onShare,
  onSmartAssign,
  disabled,
}) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(task);
    }
  };

  const handleSmartAssign = (e) => {
    e.stopPropagation();
    if (onSmartAssign) {
      onSmartAssign(task);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
      {/* SMART ASSIGN */}
      <button
        disabled={disabled}
        onClick={handleSmartAssign}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
      >
        <Sparkles size={16} />
        <span className="hidden sm:inline">Smart Assign</span>
      </button>

      {/* SHARE */}
      {onShare && (
        <button
          onClick={handleShare}
          disabled={disabled}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          title="Share with team"
        >
          <Share2 size={16} />
          <span className="hidden sm:inline">Share</span>
        </button>
      )}

      {/* EDIT */}
      <button
        disabled={disabled}
        onClick={handleEdit}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
      >
        <Edit2 size={16} />
        <span className="hidden sm:inline">Edit</span>
      </button>

      {/* DELETE */}
      <button
        disabled={disabled}
        onClick={handleDelete}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
      >
        <Trash2 size={16} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
};

export default TaskActions;
