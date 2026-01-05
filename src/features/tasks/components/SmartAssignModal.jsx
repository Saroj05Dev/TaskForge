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

  // Reset selection when modal opens
  useEffect(() => {
    if (open) {
      setSelectedTeamId("");
    }
  }, [open]);

  const handleAssign = async () => {
    if (!selectedTeamId) {
      toast.error("Please select a team");
      return;
    }

    try {
      setAssigning(true);
      const result = await dispatch(
        smartAssignTask({ taskId: task._id, teamId: selectedTeamId })
      ).unwrap();

      // Show success message from backend
      const assignedUser = result.assignedUser?.fullName || "team member";
      toast.success(`Task assigned to ${assignedUser}`);

      onClose();
    } catch (error) {
      // Error toast will be shown by TaskContainer's useEffect
      console.error("Smart assign failed:", error);
    } finally {
      setAssigning(false);
    }
  };

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="text-purple-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Smart Assign Task
              </h2>
              <p className="text-sm text-gray-500">
                Select a team to assign this task
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Task Info */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{task?.title}</h3>
              {task?.priority && (
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Team Selector */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Team
          </label>

          {teamsLoading ? (
            <div className="text-center py-4 text-gray-500">
              Loading teams...
            </div>
          ) : teams.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <Users size={24} className="mx-auto mb-2 text-gray-400" />
              <p>No teams available</p>
              <p className="text-xs mt-1">
                Create a team first to use smart assign
              </p>
            </div>
          ) : (
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Choose a team...</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name} ({team.members?.length || 0} members)
                </option>
              ))}
            </select>
          )}

          {selectedTeamId && (
            <p className="mt-2 text-xs text-gray-500">
              Task will be assigned to the team member with the fewest active
              tasks
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={assigning}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedTeamId || assigning || teams.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assigning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Assign Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Render modal using portal to escape stacking context
  return createPortal(modalContent, document.body);
};

export default SmartAssignModal;
