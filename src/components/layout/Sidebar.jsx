import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Activity, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Activity Log", path: "/activity", icon: Activity },
  { label: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-800">TaskForge</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                 ${
                   isActive
                     ? "bg-blue-600 text-white shadow-sm"
                     : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                 }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer tip */}
      <div className="p-4 m-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-blue-700 font-medium">💡 Pro Tip</p>
        <p className="text-xs text-blue-600 mt-1">
          Drag & drop to organize tasks quickly!
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
