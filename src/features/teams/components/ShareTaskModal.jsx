import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Share2, Loader2, Users, Eye, Pencil, ShieldCheck } from "lucide-react";
import { useSharedTasks } from "@/hooks/useSharedTasks";
import { useTeams } from "@/hooks/useTeams";

const PERMISSIONS = [
  { value: "view",  icon: Eye,         label: "View only",   desc: "Can read the task",                color: "text-gray-600"  },
  { value: "edit",  icon: Pencil,      label: "Can edit",    desc: "Can update the task",              color: "text-blue-600", recommended: true },
  { value: "full",  icon: ShieldCheck, label: "Full access", desc: "Can edit and delete the task",     color: "text-purple-600" },
];

const ShareTaskModal = ({ open, onClose, task }) => {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [permissions, setPermissions] = useState("edit");
  const [loading, setLoading] = useState(false);
  const { teams } = useTeams();
  const { handleShareTask } = useSharedTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeamId) return;
    try {
      setLoading(true);
      await handleShareTask(task._id, selectedTeamId, permissions);
      setSelectedTeamId(""); setPermissions("edit");
      onClose();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleClose = () => { if (!loading) { setSelectedTeamId(""); setPermissions("edit"); onClose(); } };
  const Icon = <div className="p-2 bg-teal-50 rounded-xl"><Share2 size={15} className="text-teal-600" /></div>;

  return (
    <Modal open={open} onClose={handleClose} title="Share Task" icon={Icon}>
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-5 space-y-5">
          {/* Task preview */}
          {task && (
            <div className="flex items-center gap-2.5 p-3 bg-gray-50 border border-gray-100 rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
              <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
            </div>
          )}

          {/* Team select */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Team <span className="text-red-400 normal-case">*</span>
            </label>
            <div className="relative">
              <Users size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                disabled={loading}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 text-sm text-gray-800 outline-none transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="">Choose a team...</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name} · {t.members?.length || 0} members</option>
                ))}
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Permission level
            </label>
            <div className="space-y-2">
              {PERMISSIONS.map(({ value, icon: Icon, label, desc, color, recommended }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150
                    ${permissions === value ? "border-teal-300 bg-teal-50" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}
                >
                  <input type="radio" name="permissions" value={value} checked={permissions === value} onChange={() => setPermissions(value)} className="sr-only" />
                  <div className={`p-1.5 rounded-lg bg-white border border-gray-100 shrink-0`}>
                    <Icon size={13} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{label}</span>
                      {recommended && <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded-full">Recommended</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${permissions === value ? "border-teal-500 bg-teal-500" : "border-gray-300"}`}>
                    {permissions === value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
          <button type="button" onClick={handleClose} disabled={loading} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-40">Cancel</button>
          <button type="submit" disabled={loading || !selectedTeamId} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all cursor-pointer disabled:opacity-40 shadow-sm">
            {loading ? <><Loader2 size={14} className="animate-spin" />Sharing...</> : <><Share2 size={14} />Share Task</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ShareTaskModal;
