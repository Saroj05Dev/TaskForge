import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { updateTeamApi } from "../team.api";
import { Edit3, Loader2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { useDispatch } from "react-redux";
import { updateTeam } from "../teamsSlice";

const EditTeamModal = ({ open, onClose, team }) => {
  const [form, setForm] = useState({
    name: team?.name || "",
    description: team?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    try {
      setLoading(true);
      await dispatch(updateTeam({ teamId: team._id, data: form })).unwrap();
      toast.success("Team updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update team failed", err);
      toast.error(err || "Failed to update team");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setForm({ name: team?.name || "", description: team?.description || "" });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Edit3 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Team</h3>
            <p className="text-sm text-gray-600 mt-0.5">Update team details</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Name */}
          <div>
            <label
              htmlFor="team-name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              id="team-name"
              type="text"
              placeholder="e.g., Marketing Team"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="team-description"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              id="team-description"
              placeholder="What is this team about?"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              disabled={loading}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
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
              disabled={loading || !form.name.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit3 size={18} />
                  Update Team
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditTeamModal;
