import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTeams } from "@/hooks/useTeams";
import { fetchAllTeams, leaveTeam } from "./teamsSlice";
import CreateTeamModal from "./CreateTeamModal";
import InviteMemberModal from "./InviteMemberModal";
import EditTeamModal from "./components/EditTeamModal";
import LeaveTeamModal from "./components/LeaveTeamModal";
import TeamSelector from "./components/TeamSelector";
import TeamMembersList from "./TeamMemberList";
import RemoveMemberModal from "./RemoveMemberModal";
import { useToast } from "@/contexts/ToastContext";
import { PlusCircle, UserPlus, Users, Edit3, LogOut } from "lucide-react";

const TeamQuickActions = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { teams, currentTeam, loading: teamsLoading, selectTeam } = useTeams();

  // Get current user from auth state
  const authUser = useSelector((state) => state.auth.user);

  // Fallback: Get user ID from localStorage if auth state is empty
  const getUserId = () => {
    // Try auth state first - check both 'id' and '_id' fields
    if (authUser?.id) return authUser.id;
    if (authUser?._id) return authUser._id;

    // Try localStorage
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed.id) return parsed.id;
        if (parsed._id) return parsed._id;
      }
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
    }

    return null;
  };

  const currentUserId = getUserId();

  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [leaving, setLeaving] = useState(false);

  // Check if current user is the team creator
  // Compare string IDs to handle both object and string formats
  const creatorId = currentTeam?.createdBy?._id || currentTeam?.createdBy;
  const isCreator =
    creatorId && currentUserId
      ? String(creatorId) === String(currentUserId)
      : false;

  const handleLeaveTeam = async () => {
    try {
      setLeaving(true);
      await dispatch(leaveTeam(currentTeam._id)).unwrap();
      toast.success("Left team successfully");
      setOpenLeave(false);
      // Refresh teams list
      dispatch(fetchAllTeams());
    } catch (error) {
      toast.error(error || "Failed to leave team");
    } finally {
      setLeaving(false);
    }
  };

  if (teamsLoading) {
    return <p className="text-sm text-gray-600">Loading teams...</p>;
  }

  // Empty state - no teams
  if (!teams || teams.length === 0) {
    return (
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-purple-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>

        {/* Empty State */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Users className="text-blue-600" size={32} />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No Team Yet
          </h4>
          <p className="text-sm text-gray-600 mb-6">
            Create a team to start collaborating with others
          </p>
          <button
            onClick={() => setOpenCreateTeam(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
          >
            <PlusCircle size={18} />
            Create Your First Team
          </button>
        </div>

        {/* CREATE TEAM MODAL */}
        <CreateTeamModal
          open={openCreateTeam}
          onClose={() => setOpenCreateTeam(false)}
        />
      </div>
    );
  }

  // Has teams
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-purple-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
      </div>

      {/* Team Selector */}
      {teams.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Team
          </label>
          <TeamSelector
            teams={teams}
            currentTeam={currentTeam}
            onSelectTeam={selectTeam}
          />
        </div>
      )}

      {/* Current Team Info */}
      {currentTeam && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900">
                {currentTeam.name}
              </h4>
              {currentTeam.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {currentTeam.description}
                </p>
              )}
            </div>
            {isCreator && (
              <button
                onClick={() => setOpenEdit(true)}
                className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                title="Edit team"
              >
                <Edit3 size={16} />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {currentTeam.members?.length || 0} members
          </p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => setOpenCreateTeam(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
        >
          <PlusCircle size={18} />
          Create New Team
        </button>

        {currentTeam && (
          <>
            <button
              onClick={() => setOpenInvite(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <UserPlus size={18} />
              Invite Member
            </button>

            {/* Show Leave button ONLY for non-creators */}
            {!isCreator && (
              <button
                onClick={() => setOpenLeave(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-orange-300 bg-white text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-all duration-200"
              >
                <LogOut size={18} />
                Leave Team
              </button>
            )}
          </>
        )}
      </div>

      {/* MEMBERS LIST */}
      {currentTeam && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Team Members
          </h4>
          <TeamMembersList
            members={currentTeam.members || []}
            isCreator={isCreator}
            currentUserId={currentUserId}
            onRemove={(member) => {
              setSelectedMember(member);
              setOpenRemove(true);
            }}
          />
        </div>
      )}

      {/* MODALS */}
      <CreateTeamModal
        open={openCreateTeam}
        onClose={() => {
          setOpenCreateTeam(false);
          dispatch(fetchAllTeams());
        }}
      />

      {currentTeam && (
        <>
          <InviteMemberModal
            open={openInvite}
            onClose={() => {
              setOpenInvite(false);
              dispatch(fetchAllTeams());
            }}
            teamId={currentTeam._id}
          />

          <EditTeamModal
            open={openEdit}
            onClose={() => {
              setOpenEdit(false);
              dispatch(fetchAllTeams());
            }}
            team={currentTeam}
          />

          <LeaveTeamModal
            open={openLeave}
            onClose={() => setOpenLeave(false)}
            team={currentTeam}
            loading={leaving}
            onConfirm={handleLeaveTeam}
          />

          <RemoveMemberModal
            open={openRemove}
            onClose={() => {
              setOpenRemove(false);
              dispatch(fetchAllTeams());
            }}
            member={selectedMember}
            teamId={currentTeam._id}
          />
        </>
      )}
    </div>
  );
};

export default TeamQuickActions;
