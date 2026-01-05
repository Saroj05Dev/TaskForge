import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { UserMinus, AlertTriangle, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeMember } from "./teamsSlice";
import { useToast } from "@/contexts/ToastContext";

const RemoveMemberModal = ({ open, onClose, member, teamId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleRemove = async () => {
    if (!member || !teamId) return;

    try {
      setLoading(true);
      await dispatch(removeMember({ teamId, userId: member._id })).unwrap();
      toast.success(`${member.fullName} removed from team`);
      onClose();
    } catch (error) {
      toast.error(error || "Failed to remove member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Remove Member</h3>
            <p className="text-sm text-gray-600 mt-0.5">
              Are you sure you want to remove this member?
            </p>
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <span className="font-semibold">Warning:</span> This member will
            immediately lose access to all tasks shared with this team.
          </p>
        </div>

        {/* Member Info */}
        {member && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Removing member:</p>
            <p className="text-base font-semibold text-gray-900">
              {member.fullName}
            </p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <UserMinus size={18} />
                Remove Member
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveMemberModal;
