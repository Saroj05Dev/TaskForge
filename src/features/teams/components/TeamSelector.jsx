import { Users, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const TeamSelector = ({ teams, currentTeam, onSelectTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!teams?.length) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[180px] cursor-pointer"
      >
        <Users size={15} className="text-purple-600 dark:text-purple-400 shrink-0" />
        <span className="flex-1 text-left text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {currentTeam?.name || "Select Team"}
        </span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {teams.map((team) => (
            <button
              key={team._id}
              onClick={() => { onSelectTeam(team); setIsOpen(false); }}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{team.name}</p>
                {team.description && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{team.description}</p>}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{team.members?.length || 0} members</p>
              </div>
              {currentTeam?._id === team._id && <Check size={15} className="text-purple-600 dark:text-purple-400 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelector;
