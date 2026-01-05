import { Users, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const TeamSelector = ({ teams, currentTeam, onSelectTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!teams || teams.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px]"
      >
        <Users size={18} className="text-purple-600" />
        <span className="flex-1 text-left text-sm font-medium text-gray-900 truncate">
          {currentTeam?.name || "Select Team"}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {teams.map((team) => (
            <button
              key={team._id}
              onClick={() => {
                onSelectTeam(team);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {team.name}
                </p>
                {team.description && (
                  <p className="text-xs text-gray-500 truncate">
                    {team.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">
                  {team.members?.length || 0} members
                </p>
              </div>
              {currentTeam?._id === team._id && (
                <Check size={18} className="text-purple-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelector;
