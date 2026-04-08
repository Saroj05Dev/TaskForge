import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Activity } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks",     path: "/tasks",     icon: CheckSquare      },
  { label: "Activity",  path: "/activity",  icon: Activity         },
];

const BottomNav = () => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
    <div className="flex items-stretch h-16">
      {navItems.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors duration-150
             ${isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-700"}`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1.5 rounded-xl transition-all duration-150 ${isActive ? "bg-blue-50" : ""}`}>
                <Icon size={19} />
              </div>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default BottomNav;
