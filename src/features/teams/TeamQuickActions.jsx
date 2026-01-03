import { useEffect, useState, useCallback } from "react";
import CreateTeamModal from "./CreateTeamModal";
import InviteMemberModal from "./InviteMemberModal";
import TeamMembersList from "./TeamMemberList";
import RemoveMemberModal from "./RemoveMemberModal";
import { getTeamMembersApi, removeMemberApi } from "./team.api";
import { useCurrentTeam } from "../../hooks/useCurrentTeam";
import { PlusCircle, UserPlus, Users } from "lucide-react";

const TeamQuickActions = () => {
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  const [openRemove, setOpenRemove] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [removing, setRemoving] = useState(false);

  const { team, loading: teamLoading } = useCurrentTeam();

  const fetchMembers = useCallback(async () => {
    if (!team?._id) return;

    try {
      setLoadingMembers(true);
      const res = await getTeamMembersApi(team._id);
      setMembers(res.data.data.members || []);
    } catch (err) {
      console.error("Failed to fetch members", err);
    } finally {
      setLoadingMembers(false);
    }
  }, [team?._id]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (teamLoading) {
    return <p className="text-sm text-gray-600">Loading team...</p>;
  }

  if (!team) {
    return <p className="text-sm text-gray-600">No team found</p>;
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-purple-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setOpenCreateTeam(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
        >
          <PlusCircle size={18} />
          Create Team
        </button>

        <button
          onClick={() => setOpenInvite(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <UserPlus size={18} />
          Invite Member
        </button>
      </div>

      {/* MEMBERS LIST */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Team Status
        </h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">
            {members.length} Members
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Invite team members to collaborate
          </p>
        </div>

        <div className="mt-4">
          <TeamMembersList
            members={members}
            loading={loadingMembers}
            onRemove={(member) => {
              setSelectedMember(member);
              setOpenRemove(true);
            }}
          />
        </div>
      </div>

      {/* CREATE TEAM MODAL */}
      <CreateTeamModal
        open={openCreateTeam}
        onClose={() => {
          setOpenCreateTeam(false);
          fetchMembers();
        }}
      />

      {/* INVITE MEMBER MODAL */}
      <InviteMemberModal
        open={openInvite}
        onClose={() => {
          setOpenInvite(false);
          fetchMembers();
        }}
        teamId={team._id}
      />

      {/* REMOVE MEMBER MODAL */}
      <RemoveMemberModal
        open={openRemove}
        onClose={() => setOpenRemove(false)}
        member={selectedMember}
        loading={removing}
        onConfirm={async () => {
          try {
            setRemoving(true);
            await removeMemberApi(team._id, selectedMember._id);
            setOpenRemove(false);
            fetchMembers();
          } finally {
            setRemoving(false);
          }
        }}
      />
    </div>
  );
};

export default TeamQuickActions;
