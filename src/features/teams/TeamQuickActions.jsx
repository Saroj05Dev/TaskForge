import { useEffect, useState } from "react";
import CreateTeamModal from "./CreateTeamModal";
import InviteMemberModal from "./InviteMemberModal";
import { getTeamMembersApi } from "./team.api";
import TeamMembersList from "./TeamMemberList";

const TeamQuickActions = () => {
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  // ⚠️ TEMP — later derive from auth / selected team
  const teamId = "6951507a9087cb1b5d35b80e";

  const fetchMembers = async () => {
    try {
      setLoadingMembers(true);
      const res = await getTeamMembersApi(teamId);
      setMembers(res.data.data.members || []);
    } catch (err) {
      console.error("Failed to fetch members", err);
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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
        />
      </div>

      {/* MODALS */}
      <CreateTeamModal
        open={openCreateTeam}
        onClose={() => {
          setOpenCreateTeam(false);
          fetchMembers(); // refresh
        }}
      />

      <InviteMemberModal
        open={openInvite}
        onClose={() => {
          setOpenInvite(false);
          fetchMembers(); // refresh
        }}
        teamId={teamId}
      />
    </div>
  );
};

export default TeamQuickActions;
