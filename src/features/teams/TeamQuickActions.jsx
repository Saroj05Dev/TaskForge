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
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Users size={16} className="text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h3>
        </div>
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-4">
            <Users className="text-blue-600 dark:text-blue-400" size={26} />
          </div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">No Team Yet</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
            Create a team to start collaborating with others
          </p>
          <button
            onClick={() => setOpenCreateTeam(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
          >
            <PlusCircle size={16} />
            Create Your First Team
          </button>
        </div>

        <CreateTeamModal open={openCreateTeam} onClose={() => setOpenCreateTeam(false)} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Users size={16} className="text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Team Management</h3>
      </div>

      {/* Team Selector */}
      {teams.length > 1 && (
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            Current Team
          </label>
          <TeamSelector teams={teams} currentTeam={currentTeam} onSelectTeam={selectTeam} />
        </div>
      )}

      {/* Current Team Info */}
      {currentTeam && (
        <div className="mb-5 p-3.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{currentTeam.name}</h4>
              {currentTeam.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{currentTeam.description}</p>
              )}
            </div>
            {isCreator && (
              <button onClick={() => setOpenEdit(true)} className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors shrink-0 cursor-pointer" title="Edit team">
                <Edit3 size={14} />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{currentTeam.members?.length || 0} members</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mb-5">
        <button onClick={() => setOpenCreateTeam(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow cursor-pointer">
          <PlusCircle size={16} />Create New Team
        </button>
        {currentTeam && (
          <>
            <button onClick={() => setOpenInvite(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer">
              <UserPlus size={16} />Invite Member
            </button>
            {!isCreator && (
              <button onClick={() => setOpenLeave(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 border border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 cursor-pointer">
                <LogOut size={16} />Leave Team
              </button>
            )}
          </>
        )}
      </div>

      {/* Members List */}
      {currentTeam && (
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Members</p>
          <TeamMembersList members={currentTeam.members || []} isCreator={isCreator} currentUserId={currentUserId} onRemove={(member) => { setSelectedMember(member); setOpenRemove(true); }} />
        </div>
      )}

      {/* Modals */}
      <CreateTeamModal open={openCreateTeam} onClose={() => { setOpenCreateTeam(false); dispatch(fetchAllTeams()); }} />
      {currentTeam && (
        <>
          <InviteMemberModal open={openInvite} onClose={() => { setOpenInvite(false); dispatch(fetchAllTeams()); }} teamId={currentTeam._id} />
          <EditTeamModal open={openEdit} onClose={() => { setOpenEdit(false); dispatch(fetchAllTeams()); }} team={currentTeam} />
          <LeaveTeamModal open={openLeave} onClose={() => setOpenLeave(false)} team={currentTeam} loading={leaving} onConfirm={handleLeaveTeam} />
          <RemoveMemberModal open={openRemove} onClose={() => { setOpenRemove(false); dispatch(fetchAllTeams()); }} member={selectedMember} teamId={currentTeam._id} />
        </>
      )}
    </div>
  );
};

export default TeamQuickActions;
