import { X, SlidersHorizontal } from "lucide-react";

const selectCls = "px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm text-gray-700 dark:text-gray-200 outline-none transition-all duration-200 cursor-pointer";

const FilterDropdowns = ({ filters, onChange, onClear }) => {
  const hasActiveFilters = filters.priority || filters.status;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={filters.priority || ""} onChange={(e) => onChange("priority", e.target.value)} className={selectCls}>
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select value={filters.status || ""} onChange={(e) => onChange("status", e.target.value)} className={selectCls}>
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {hasActiveFilters && (
        <>
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium">
            <SlidersHorizontal size={13} />
            {[filters.priority, filters.status].filter(Boolean).length} active
          </span>
          <button onClick={onClear} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-150 cursor-pointer">
            <X size={13} />Clear
          </button>
        </>
      )}
    </div>
  );
};

export default FilterDropdowns;
