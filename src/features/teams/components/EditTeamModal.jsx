import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Edit3, Loader2, Check } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { useDispatch } from "react-redux";
import { updateTeam } from "../teamsSlice";

const inputCls = "w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 cursor-text disabled:opacity-50";
const labelCls = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5";

const EditTeamModal = ({ open, onClose, team }) => {
  const [form, setForm] = useState({ name: team?.name || "", description: team?.description || "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Team name is required"); return; }
    try {
      setLoading(true);
      await dispatch(updateTeam({ teamId: team._id, data: form })).unwrap();
      toast.success("Team updated!");
      onClose();
    } catch (err) { toast.error(err || "Failed to update team"); }
    finally { setLoading(false); }
  };

  const handleClose = () => { if (!loading) { setForm({ name: team?.name || "", description: team?.description || "" }); onClose(); } };
  const Icon = <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl"><Edit3 size={15} className="text-amber-600 dark:text-amber-400" /></div>;

  return (
    <Modal open={open} onClose={handleClose} title="Edit Team" icon={Icon}>
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Team name <span className="text-red-400 normal-case">*</span></label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={loading} className={inputCls} autoFocus />
          </div>
          <div>
            <label className={labelCls}>Description <span className="text-gray-400 dark:text-gray-500 normal-case font-normal">(optional)</span></label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={loading} rows={3} className={`${inputCls} resize-none`} />
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button type="button" onClick={handleClose} disabled={loading} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-40">Cancel</button>
          <button type="submit" disabled={loading || !form.name.trim()} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-all cursor-pointer disabled:opacity-40 shadow-sm">
            {loading ? <><Loader2 size={14} className="animate-spin" />Saving...</> : <><Check size={14} />Save Changes</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTeamModal;
