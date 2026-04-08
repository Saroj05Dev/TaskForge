import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { createTeamApi } from "./team.api";
import { Users, Loader2, Plus } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const inputCls = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 cursor-text disabled:opacity-50 disabled:cursor-not-allowed";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

const CreateTeamModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Please enter a team name"); return; }
    try {
      setLoading(true);
      await createTeamApi(form);
      toast.success("Team created!");
      setForm({ name: "", description: "" });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create team");
    } finally { setLoading(false); }
  };

  const handleClose = () => { if (!loading) { setForm({ name: "", description: "" }); onClose(); } };

  const Icon = <div className="p-2 bg-blue-50 rounded-xl"><Users size={15} className="text-blue-600" /></div>;

  return (
    <Modal open={open} onClose={handleClose} title="Create Team" icon={Icon}>
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Team name <span className="text-red-400 normal-case">*</span></label>
            <input type="text" placeholder="e.g. Design Squad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={loading} className={inputCls} autoFocus />
          </div>
          <div>
            <label className={labelCls}>Description <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
            <textarea placeholder="What is this team about?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={loading} rows={3} className={`${inputCls} resize-none`} />
          </div>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <button type="button" onClick={handleClose} disabled={loading} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-40">Cancel</button>
          <button type="submit" disabled={loading || !form.name.trim()} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
            {loading ? <><Loader2 size={14} className="animate-spin" />Creating...</> : <><Plus size={14} />Create Team</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
