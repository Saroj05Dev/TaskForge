import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Tasks", path: "/tasks"},
    { label: "Activity Log", path: "/activity"},
    { label: "Settings", path: "/settings"}
]


const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar h-screen border-r border-border flex flex-col">
      {/* Brand */}
      <div className="px-6 py-4 text-xl font-semibold">
        TaskForge
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm transition
               ${isActive ? "bg-primary text-white" : "text-muted hover:bg-muted"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer tip */}
      <div className="p-4 text-xs text-muted">
        💡 Tip: Drag & drop tasks to update status
      </div>
    </aside>
  )
}

export default Sidebar
