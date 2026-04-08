import Modal from "@/components/ui/Modal";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ open, onClose, onConfirm, taskTitle, loading }) => (
  <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
    <div className="px-5 py-6 flex flex-col items-center text-center gap-4">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
        <Trash2 size={24} className="text-red-500" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Delete task?</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="font-medium text-gray-700">"{taskTitle}"</span> will be permanently deleted. This cannot be undone.
        </p>
      </div>
    </div>

    <div className="flex gap-2 px-5 pb-5">
      <button
        onClick={onClose}
        disabled={loading}
        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-40"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
      >
        {loading
          ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Deleting...</>
          : <><Trash2 size={14} />Delete</>
        }
      </button>
    </div>
  </Modal>
);

export default DeleteConfirmModal;
