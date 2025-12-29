import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { logoutUser } from "@/features/auth/login/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "64px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          fontWeight: "600",
          fontSize: "18px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        TaskForge
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "12px" }}>
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/login")}
              style={navButtonStyle}
            >
              <LogIn size={16} />
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              style={primaryButtonStyle}
            >
              <UserPlus size={16} />
              Signup
            </button>
          </>
        ) : (
          <>
            <span
              style={{
                fontSize: "14px",
                color: "#374151",
              }}
            >
              👋 {user?.fullName}
            </span>

            <button
              onClick={handleLogout}
              style={dangerButtonStyle}
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

/* ---------------- STYLES ---------------- */

const navButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer",
};

const primaryButtonStyle = {
  ...navButtonStyle,
  background: "#2563eb",
  color: "white",
  border: "none",
};

const dangerButtonStyle = {
  ...navButtonStyle,
  background: "#ef4444",
  color: "white",
  border: "none",
};

export default Navbar;
