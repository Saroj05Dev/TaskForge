import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Share2, Loader2, Users } from "lucide-react";
import { useSharedTasks } from "@/hooks/useSharedTasks";
import { useTeams } from "@/hooks/useTeams";

const ShareTaskModal = ({ open, onClose, task }) => {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [permissions, setPermissions] = useState("edit");
  const [loading, setLoading] = useState(false);

  const { teams } = useTeams();
  const { handleShareTask } = useSharedTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTeamId) {
      return;
    }

    try {
      setLoading(true);
      await handleShareTask(task._id, selectedTeamId, permissions);
      setSelectedTeamId("");
      setPermissions("edit");
      onClose();
    } catch (error) {
      console.error("Share task failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedTeamId("");
      setPermissions("edit");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Share2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Share Task</h3>
            <p className="text-sm text-gray-600 mt-0.5">Share with your team</p>
          </div>
        </div>

        {/* Task Info */}
        {task && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Sharing task:</p>
            <p className="text-sm font-semibold text-gray-900">{task.title}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Selection */}
          <div>
            <label
              htmlFor="team-select"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Select Team <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="team-select"
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Choose a team...</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name} ({team.members?.length || 0} members)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="permissions"
                  value="view"
                  checked={permissions === "view"}
                  onChange={(e) => setPermissions(e.target.value)}
                  disabled={loading}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">View Only</p>
                  <p className="text-xs text-gray-500">
                    Team members can only view the task
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="permissions"
                  value="edit"
                  checked={permissions === "edit"}
                  onChange={(e) => setPermissions(e.target.value)}
                  disabled={loading}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Edit <span className="text-green-600">(Recommended)</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Team members can view and update the task
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="permissions"
                  value="full"
                  checked={permissions === "full"}
                  onChange={(e) => setPermissions(e.target.value)}
                  disabled={loading}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Full Access
                  </p>
                  <p className="text-xs text-gray-500">
                    Team members can view, update, and delete the task
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedTeamId}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 size={18} />
                  Share Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ShareTaskModal;
