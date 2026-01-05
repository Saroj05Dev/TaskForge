import Modal from "@/components/ui/Modal";
import { LogOut, AlertTriangle, Loader2 } from "lucide-react";

const LeaveTeamModal = ({ open, onClose, team, loading, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Leave Team</h3>
            <p className="text-sm text-gray-600 mt-0.5">
              Are you sure you want to leave?
            </p>
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-orange-800">
            <span className="font-semibold">Warning:</span> You will lose access
            to all tasks shared with this team. You can only rejoin if the team
            creator invites you again.
          </p>
        </div>

        {/* Team Info */}
        {team && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Leaving team:</p>
            <p className="text-base font-semibold text-gray-900">{team.name}</p>
            {team.description && (
              <p className="text-sm text-gray-500 mt-1">{team.description}</p>
            )}
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
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Leaving...
              </>
            ) : (
              <>
                <LogOut size={18} />
                Leave Team
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LeaveTeamModal;
