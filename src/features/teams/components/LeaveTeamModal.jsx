import Modal from "@/components/ui/Modal";
import { LogOut, Loader2 } from "lucide-react";

const LeaveTeamModal = ({ open, onClose, team, loading, onConfirm }) => (
  <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
    <div className="px-5 py-6 flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
        <LogOut size={24} className="text-orange-500" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Leave team?</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          You'll lose access to all tasks shared with{" "}
          <span className="font-medium text-gray-700">{team?.name}</span>. You can only rejoin if re-invited.
        </p>
      </div>
    </div>

    <div className="flex gap-2 px-5 pb-5">
      <button onClick={onClose} disabled={loading} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-40">Stay</button>
      <button onClick={onConfirm} disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-40 shadow-sm">
        {loading ? <><Loader2 size={14} className="animate-spin" />Leaving...</> : <><LogOut size={14} />Leave</>}
      </button>
    </div>
  </Modal>
);

export default LeaveTeamModal;
