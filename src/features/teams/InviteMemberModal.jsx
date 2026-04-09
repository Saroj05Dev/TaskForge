import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { inviteMemberApi } from "./team.api";
import { UserPlus, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const inputCls = "w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-400 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 cursor-text disabled:opacity-50";
const labelCls = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5";

const InviteMemberModal = ({ open, onClose, teamId }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter an email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Invalid email address"); return; }
    try {
      setLoading(true);
      await inviteMemberApi(teamId, { email });
      toast.success(`Invitation sent to ${email}`);
      setEmail(""); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to invite member"); }
    finally { setLoading(false); }
  };

  const handleClose = () => { if (!loading) { setEmail(""); onClose(); } };
  const Icon = <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl"><UserPlus size={15} className="text-purple-600 dark:text-purple-400" /></div>;

  return (
    <Modal open={open} onClose={handleClose} title="Invite Member" icon={Icon}>
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Email address <span className="text-red-400 normal-case">*</span></label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="email" placeholder="colleague@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className={`${inputCls} pl-9`} autoFocus />
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5">The user must already have a TaskForge account.</p>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">Invited members can view and manage tasks shared with this team.</p>
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button type="button" onClick={handleClose} disabled={loading} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-40">Cancel</button>
          <button type="submit" disabled={loading || !email.trim()} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-all cursor-pointer disabled:opacity-40 shadow-sm">
            {loading ? <><Loader2 size={14} className="animate-spin" />Sending...</> : <><UserPlus size={14} />Send Invite</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteMemberModal;
