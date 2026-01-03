import Modal from "@/components/ui/Modal";

const RemoveMemberModal = ({
  open,
  onClose,
  onConfirm,
  member,
  loading,
}) => {
  if (!member) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h3>Remove Member</h3>

      <p style={{ marginTop: "12px" }}>
        Are you sure you want to remove{" "}
        <strong>{member.fullName}</strong> from the team?
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <button onClick={onClose} disabled={loading}>
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          style={{
            background: "#ef4444",
            color: "white",
          }}
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>
    </Modal>
  );
};

export default RemoveMemberModal;
