import { useEffect } from "react";

const Modal = ({ open, onClose, children }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: "420px",
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Close Button */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
