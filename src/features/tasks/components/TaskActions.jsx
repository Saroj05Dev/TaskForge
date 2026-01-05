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
    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
      {/* SMART ASSIGN */}
      <button
        disabled={disabled}
        onClick={handleSmartAssign}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles size={14} />
        Smart Assign
      </button>

      {/* SHARE */}
      {onShare && (
        <button
          onClick={handleShare}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Share with team"
        >
          <Share2 size={14} />
          Share
        </button>
      )}

      {/* EDIT */}
      <button
        disabled={disabled}
        onClick={handleEdit}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Edit2 size={14} />
        Edit
      </button>

      {/* DELETE */}
      <button
        disabled={disabled}
        onClick={handleDelete}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

export default TaskActions;
