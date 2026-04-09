import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Activity", path: "/activity", icon: Activity },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const expanded = !isCollapsed || isHovered;

  const handleNavClick = () => {
    if (window.innerWidth < 1024) setIsCollapsed(true);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-50
          bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col
          transition-all duration-300 ease-in-out shadow-sm
          ${expanded ? "w-60" : "w-[68px]"}
          ${isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 select-none">
              <span className="text-white text-[11px] font-black tracking-tight leading-none">TF</span>
            </div>
            <span className={`text-[15px] font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap transition-all duration-200 overflow-hidden ${
                expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}>
              TaskForge
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all shrink-0 cursor-pointer ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={handleNavClick}
              title={!expanded ? label : undefined}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                 ${
                   isActive
                     ? "bg-blue-600 text-white shadow-sm"
                     : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span
                    className={`whitespace-nowrap transition-all duration-200 ${
                      expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom hint */}
        <div className={`mx-3 mb-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 transition-all duration-200 overflow-hidden ${
            expanded ? "p-3 opacity-100" : "p-0 opacity-0 h-0 m-0"
          }`}>
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-0.5">Pro tip</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
            Drag & drop tasks on the Kanban board to update status instantly.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
