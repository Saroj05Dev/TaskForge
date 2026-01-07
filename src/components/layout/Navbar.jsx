import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/login/loginSlice";
import { Menu, LogOut, User, CheckSquare } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6 shrink-0">
      {/* Left: Menu Button (Mobile) + Tasks Link (Mobile) + Brand (when logged in) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Tasks Link - Mobile Only */}
        <button
          onClick={() => navigate("/tasks")}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          <CheckSquare size={16} />
          Tasks
        </button>

        {/* Brand - Only show when logged in */}
        {user && (
          <div
            className="text-base md:text-lg font-semibold text-gray-900 cursor-pointer"
            onClick={() => navigate("/")}
          >
            TaskForge
          </div>
        )}
      </div>

      {/* Right: User Info & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {user ? (
          <>
            {/* User Info - Hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <User size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user.fullName}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="px-3 md:px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Login
            </button>

            {/* Sign Up Button */}
            <button
              onClick={() => navigate("/signup")}
              className="px-3 md:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
