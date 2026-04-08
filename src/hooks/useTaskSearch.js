import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchTasks, fetchTasks } from "@/features/tasks/taskSlice";

export const useTaskSearch = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({ priority: "", status: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = {};
      if (searchText.trim()) params.search = searchText.trim();
      if (filters.priority)  params.priority = filters.priority;
      if (filters.status)    params.status   = filters.status;

      if (Object.keys(params).length === 0) {
        dispatch(fetchTasks());
      } else {
        dispatch(searchTasks(params));
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, filters.priority, filters.status]);

  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  const clearSearch  = () => setSearchText("");
  const clearFilters = () => setFilters({ priority: "", status: "" });
  const clearAll     = () => { clearSearch(); clearFilters(); };

  return {
    searchText,
    setSearchText,
    filters,
    handleFilterChange,
    clearSearch,
    clearFilters,
    clearAll,
  };
};
