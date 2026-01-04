import Modal from "@/components/ui/Modal";
import { AlertTriangle, UserMinus } from "lucide-react";

const RemoveMemberModal = ({ open, onClose, onConfirm, member, loading }) => {
  if (!member) return null;

  return (
    <Modal open={open} onClose={onClose}>
      {/* Warning Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-orange-600" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
        Remove Team Member?
      </h3>

      {/* Message */}
      <p className="text-sm text-gray-600 text-center mb-6">
        Are you sure you want to remove{" "}
        <span className="font-semibold text-gray-900">{member.fullName}</span>{" "}
        from the team?
        <br />
        <span className="text-orange-600 font-medium">
          They will lose access to all team resources.
        </span>
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Removing...
            </>
          ) : (
            <>
              <UserMinus size={16} />
              Remove Member
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default RemoveMemberModal;
