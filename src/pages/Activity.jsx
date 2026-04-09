import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "@/features/activity/activitySlice";
import ActivityList from "@/features/activity/components/ActivityList";
import DashboardLayout from "@/layouts/DashboardLayout";
import BackButton from "@/components/ui/BackButton";
import { ACTION_TYPES, ACTION_CONFIG } from "@/features/activity/utils/activityIcons";
import { RefreshCw, Activity as ActivityIcon, Filter, X, ChevronDown } from "lucide-react";

const LIMITS = [20, 50, 100];

const Activity = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.activity);

  const [limit, setLimit]           = useState(20);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    dispatch(fetchActivities(limit));
  }, [dispatch, limit]);

  const handleRefresh = () => dispatch(fetchActivities(limit));

  // Client-side filter by action type
  const filtered = useMemo(() => {
    if (!filterType) return items;
    return items.filter((a) => a.actionType === filterType);
  }, [items, filterType]);

  // Quick stats
  const stats = useMemo(() => {
    const counts = {};
    items.forEach((a) => { counts[a.actionType] = (counts[a.actionType] || 0) + 1; });
    // Top 3 action types
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type, count]) => ({ type, count, cfg: ACTION_CONFIG[type] }))
      .filter((s) => s.cfg);
  }, [items]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="w-px h-5 bg-gray-200" />
            <div className="p-2 bg-purple-600 rounded-xl shadow-sm">
              <ActivityIcon size={17} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Activity Log</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {items.length} event{items.length !== 1 ? "s" : ""} · all team actions
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="group flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            Refresh
          </button>
        </div>

        {/* Quick stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map(({ type, count, cfg }) => {
              const Icon = cfg.icon;
              return (
                <button key={type} onClick={() => setFilterType(filterType === type ? "" : type)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer text-left w-full
                    ${filterType === type ? `${cfg.bg} border-current ${cfg.color} shadow-sm` : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm"}`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${cfg.bg}`}><Icon size={14} className={cfg.color} /></div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums leading-none">{count}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{cfg.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-400 text-sm text-gray-700 dark:text-gray-200 outline-none transition-all duration-200 cursor-pointer">
              <option value="">All actions</option>
              {ACTION_TYPES.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 focus:border-purple-400 text-sm text-gray-700 dark:text-gray-200 outline-none transition-all duration-200 cursor-pointer">
              {LIMITS.map((l) => (<option key={l} value={l}>Last {l}</option>))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {filterType && (
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg border border-purple-100 dark:border-purple-800">
                <Filter size={11} />{ACTION_CONFIG[filterType]?.label ?? filterType}
              </span>
              <button onClick={() => setFilterType("")} className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer"><X size={13} /></button>
            </div>
          )}
          <span className="ml-auto text-xs text-gray-400 tabular-nums">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Activity feed */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400">Loading activity...</p>
            </div>
          ) : (
            <ActivityList activities={filtered} />
          )}
        </div>

        {!loading && items.length >= limit && limit < 100 && (
          <div className="flex justify-center">
            <button onClick={() => setLimit((l) => Math.min(l + 20, 100))}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150 cursor-pointer shadow-sm">
              <ChevronDown size={15} />Load more
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Activity;
