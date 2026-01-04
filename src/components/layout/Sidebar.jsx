import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Activity Log", path: "/activity", icon: Activity },
  { label: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);

  // On desktop: show expanded on hover if collapsed
  // On mobile: controlled by isCollapsed prop
  const shouldShowExpanded = !isCollapsed || isHovered;

  const handleNavClick = () => {
    // Close sidebar on mobile when nav item is clicked
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50
          transition-all duration-300 ease-in-out
          ${shouldShowExpanded ? "w-64" : "w-16"}
          ${
            isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
          }
        `}
      >
        {/* Brand */}
        <div className="px-4 py-5 border-b border-gray-200 flex items-center justify-between">
          <h1
            className={`text-lg font-bold text-gray-800 transition-opacity duration-200 ${
              shouldShowExpanded ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            TaskForge
          </h1>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                   ${
                     isActive
                       ? "bg-blue-600 text-white shadow-sm"
                       : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                   }`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span
                  className={`transition-all duration-200 whitespace-nowrap ${
                    shouldShowExpanded
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer tip */}
        <div
          className={`m-2 bg-blue-50 rounded-lg border border-blue-100 transition-all duration-200 overflow-hidden ${
            shouldShowExpanded ? "p-3 opacity-100" : "p-0 opacity-0 h-0"
          }`}
        >
          <div className="flex items-start gap-2">
            <Lightbulb size={14} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-blue-700 font-medium">Pro Tip</p>
              <p className="text-xs text-blue-600 mt-1">
                Drag & drop to organize tasks quickly!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
