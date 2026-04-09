import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/login/loginSlice";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Menu, Search, LogOut, ChevronDown, X,
  CheckSquare, Clock, CircleCheck, ArrowRight, Moon, Sun,
} from "lucide-react";

// Status badge config
const STATUS_STYLES = {
  "Todo":        { color: "text-gray-500",  bg: "bg-gray-100"  },
  "In Progress": { color: "text-blue-600",  bg: "bg-blue-50"   },
  "Done":        { color: "text-green-600", bg: "bg-green-50"  },
};
const STATUS_ICONS = {
  "Todo":        CheckSquare,
  "In Progress": Clock,
  "Done":        CircleCheck,
};

const MAX_SUGGESTIONS = 6;

const Navbar = ({ onMenuClick }) => {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const user       = useSelector((state) => state.auth.user);
  const allTasks   = useSelector((state) => state.tasks.items);
  const { isDark, toggle } = useTheme();

  const [searchQuery,   setSearchQuery]   = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex,   setActiveIndex]   = useState(-1);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);

  const searchWrapRef = useRef(null);
  const searchRef     = useRef(null);
  const dropdownRef   = useRef(null);

  // ── Filtered suggestions ──────────────────────────────────────────────────
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allTasks
      .filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [searchQuery, allTasks]);

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target))
        setShowSuggestions(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Reset active index when suggestions change
  useEffect(() => { setActiveIndex(-1); }, [suggestions]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const commitSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/tasks?search=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setShowSuggestions(false);
    searchRef.current?.blur();
  };

  const selectSuggestion = (task) => {
    navigate(`/tasks/${task._id}`);
    setSearchQuery("");
    setShowSuggestions(false);
    searchRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") commitSearch();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) selectSuggestion(suggestions[activeIndex]);
      else commitSearch();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      searchRef.current?.blur();
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logoutUser());
    navigate("/login");
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const isFocused = showSuggestions || searchQuery.length > 0;

  return (
    <nav className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 px-4 md:px-6 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)] z-40">
      {/* Mobile menu toggle — only needed on lg+ where sidebar exists */}
      <button
        onClick={onMenuClick}
        className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Logo — mobile only */}
      <div
        className="lg:hidden flex items-center shrink-0 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center select-none">
          <span className="text-white text-[10px] font-black tracking-tight leading-none">TF</span>
        </div>
      </div>

      {/* ── Search with suggestions ── */}
      <div
        ref={searchWrapRef}
        className={`relative flex-1 max-w-md transition-all duration-200 ${isFocused ? "max-w-lg" : ""}`}
      >
        {/* Input */}
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 bg-gray-50 dark:bg-gray-800 ${
            isFocused
              ? "border-blue-400 bg-white dark:bg-gray-800 shadow-sm ring-2 ring-blue-100 dark:ring-blue-900"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <Search
            size={15}
            className={`shrink-0 transition-colors ${isFocused ? "text-blue-500" : "text-gray-400"}`}
          />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search tasks..."
            className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none min-w-0"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Suggestions dropdown ── */}
        {showSuggestions && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden z-50">
            {suggestions.length > 0 ? (
              <>
                <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Tasks
                </p>
                <ul>
                  {suggestions.map((task, i) => {
                    const style  = STATUS_STYLES[task.status] ?? STATUS_STYLES["Todo"];
                    const Icon   = STATUS_ICONS[task.status]  ?? CheckSquare;
                    const isActive = i === activeIndex;
                    return (
                      <li key={task._id}>
                        <button
                          type="button"
                          onMouseDown={() => selectSuggestion(task)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                            isActive ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Icon size={14} className={`shrink-0 ${style.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 dark:text-gray-200 truncate font-medium">
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-xs text-gray-400 truncate mt-0.5">
                                {task.description}
                              </p>
                            )}
                          </div>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md shrink-0 ${style.bg} ${style.color}`}>
                            {task.status}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {/* "See all results" footer */}
                <button
                  type="button"
                  onMouseDown={commitSearch}
                  className="w-full flex items-center justify-between px-3 py-2.5 border-t border-gray-100 text-xs text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                >
                  <span>See all results for "{searchQuery.trim()}"</span>
                  <ArrowRight size={13} />
                </button>
              </>
            ) : (
              <div className="px-4 py-5 text-center">
                <p className="text-sm text-gray-500">No tasks match "{searchQuery.trim()}"</p>
                <p className="text-xs text-gray-400 mt-0.5">Try a different keyword</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Dark mode toggle */}
      <button
        onClick={toggle}
        className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 cursor-pointer shrink-0"
        aria-label="Toggle dark mode"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark
          ? <Sun size={18} className="text-amber-400" />
          : <Moon size={18} />
        }
      </button>

      {/* ── User menu ── */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-150"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-500 dark:text-gray-400 max-w-[120px] truncate">
              {user.fullName}
            </span>
            <ChevronDown
              size={14}
              className={`hidden sm:block text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg py-1.5 z-50">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 mb-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user.fullName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
