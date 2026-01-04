import { Filter, X } from "lucide-react";

const FilterDropdowns = ({ filters, onChange, onClear }) => {
  const hasActiveFilters = filters.priority || filters.status;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Priority Filter */}
      <select
        value={filters.priority || ""}
        onChange={(e) => onChange("priority", e.target.value)}
        className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status Filter */}
      <select
        value={filters.status || ""}
        onChange={(e) => onChange("status", e.target.value)}
        className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
      >
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X size={16} />
          <span className="hidden sm:inline">Clear Filters</span>
        </button>
      )}

      {/* Active Filter Count */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <Filter size={16} />
          <span className="font-medium">
            {[filters.priority, filters.status].filter(Boolean).length} active
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterDropdowns;
