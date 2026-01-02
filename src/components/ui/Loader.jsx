const Loader = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Animated Card */}
      <div
        style={{
          width: "220px",
          height: "120px",
          borderRadius: "12px",
          background: "#e5e7eb",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #e5e7eb, #f3f4f6, #e5e7eb)",
            animation: "shimmer 1.4s infinite",
          }}
        />
      </div>

      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Loading tasks...
      </p>

      {/* Animation */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
