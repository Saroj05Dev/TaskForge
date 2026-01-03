import { useEffect, useState, useCallback } from "react";
import CreateTeamModal from "./CreateTeamModal";
import InviteMemberModal from "./InviteMemberModal";
import TeamMembersList from "./TeamMemberList";
import RemoveMemberModal from "./RemoveMemberModal";
import { getTeamMembersApi, removeMemberApi } from "./team.api";
import { useCurrentTeam } from "../../hooks/useCurrentTeam";

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
    return <p>Loading team...</p>;
  }

  if (!team) {
    return <p>No team found</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <h3>Team Quick Actions</h3>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        <button onClick={() => setOpenCreateTeam(true)}>
          + Create Team
        </button>

        <button onClick={() => setOpenInvite(true)}>
          Invite Member
        </button>
      </div>

      {/* MEMBERS LIST */}
      <div style={{ marginTop: "16px" }}>
        <h4>Team Members</h4>
        <TeamMembersList
          members={members}
          loading={loadingMembers}
          onRemove={(member) => {
            setSelectedMember(member);
            setOpenRemove(true);
          }}
        />
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
