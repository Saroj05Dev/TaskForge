import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { UserMinus, Loader2 } from "lucide-react";
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
      toast.success(`${member.fullName} removed`);
      onClose();
    } catch (error) {
      toast.error(error || "Failed to remove member");
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
      <div className="px-5 py-6 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
          <UserMinus size={24} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Remove member?</h3>
          {member && (
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="font-medium text-gray-700">{member.fullName}</span> will lose access to all tasks shared with this team.
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 px-5 pb-5">
        <button onClick={onClose} disabled={loading} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-40">Cancel</button>
        <button onClick={handleRemove} disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all cursor-pointer disabled:opacity-40 shadow-sm">
          {loading ? <><Loader2 size={14} className="animate-spin" />Removing...</> : <><UserMinus size={14} />Remove</>}
        </button>
      </div>
    </Modal>
  );
};

export default RemoveMemberModal;
