import { X, SlidersHorizontal } from "lucide-react";

const FilterDropdowns = ({ filters, onChange, onClear }) => {
  const hasActiveFilters = filters.priority || filters.status;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filters.priority || ""}
        onChange={(e) => onChange("priority", e.target.value)}
        className="px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-gray-700 outline-none transition-all duration-200 cursor-pointer"
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        value={filters.status || ""}
        onChange={(e) => onChange("status", e.target.value)}
        className="px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-gray-700 outline-none transition-all duration-200 cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {hasActiveFilters && (
        <>
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
            <SlidersHorizontal size={13} />
            {[filters.priority, filters.status].filter(Boolean).length} active
          </span>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-150 cursor-pointer"
          >
            <X size={13} />
            Clear
          </button>
        </>
      )}
    </div>
  );
};

export default FilterDropdowns;
