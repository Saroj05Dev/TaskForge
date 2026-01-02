import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { inviteMemberApi } from "./team.api";

const InviteMemberModal = ({ open, onClose, teamId }) => {
  const [email, setEmail] = useState("");

  const handleInvite = async () => {
    try {
      await inviteMemberApi(teamId, { email });
      onClose();
    } catch (err) {
      console.error("Invite failed", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3>Invite Member</h3>

      <input
        placeholder="Member email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleInvite}>Invite</button>
    </Modal>
  );
};

export default InviteMemberModal;
