import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { logoutUser } from "@/features/auth/login/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm">
      {/* LEFT */}
      <div
        className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => navigate("/")}
      >
        Dashboard
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <LogIn size={16} />
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-200"
            >
              <UserPlus size={16} />
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-700 font-medium">
              👋 {user?.fullName}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 shadow-sm hover:shadow transition-all duration-200"
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

export default Navbar;
