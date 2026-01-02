import Modal from "@/components/ui/Modal";

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  taskTitle,
  loading,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <h3>Delete Task</h3>

      <p style={{ margin: "12px 0" }}>
        Are you sure you want to delete
        <strong> {taskTitle}</strong>?
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
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
