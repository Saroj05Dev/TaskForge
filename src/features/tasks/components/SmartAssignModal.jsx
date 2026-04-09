import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useTeams } from "@/hooks/useTeams";
import { smartAssignTask } from "../taskSlice";
import { useToast } from "@/contexts/ToastContext";
import { Sparkles, X, Users } from "lucide-react";

const SmartAssignModal = ({ open, onClose, task }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { teams, loading: teamsLoading } = useTeams();
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [assigning, setAssigning] = useState(false);

  useEffect(() => { if (open) setSelectedTeamId(""); }, [open]);

  const handleAssign = async () => {
    if (!selectedTeamId) { toast.error("Please select a team"); return; }
    try {
      setAssigning(true);
      const result = await dispatch(smartAssignTask({ taskId: task._id, teamId: selectedTeamId })).unwrap();
      toast.success(`Task assigned to ${result.assignedUser?.fullName || "team member"}`);
      onClose();
    } catch (error) {
      toast.error(error || "Only the task creator can use Smart Assign.");
    } finally { setAssigning(false); }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-9999 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Sparkles size={15} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Smart Assign</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Select a team to assign this task</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Task preview */}
        <div className="px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{task?.title}</p>
          {task?.priority && (
            <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-md ${
              task.priority === "High"   ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" :
              task.priority === "Medium" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" :
                                          "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
            }`}>{task.priority}</span>
          )}
        </div>

        {/* Team selector */}
        <div className="px-5 py-5">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Select Team
          </label>
          {teamsLoading ? (
            <p className="text-sm text-gray-400 text-center py-4">Loading teams...</p>
          ) : teams.length === 0 ? (
            <div className="text-center py-4">
              <Users size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No teams available</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Create a team first</p>
            </div>
          ) : (
            <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-400 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all cursor-pointer">
              <option value="">Choose a team...</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>{team.name} ({team.members?.length || 0} members)</option>
              ))}
            </select>
          )}
          {selectedTeamId && (
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Assigns to the member with the fewest active tasks.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button onClick={onClose} disabled={assigning}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-40">
            Cancel
          </button>
          <button onClick={handleAssign} disabled={!selectedTeamId || assigning || teams.length === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
            {assigning
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Assigning...</>
              : <><Sparkles size={14} />Assign Task</>
            }
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SmartAssignModal;
