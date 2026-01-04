import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchTasks, fetchTasks } from "@/features/tasks/taskSlice";

export const useTaskSearch = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchText, filters]);

  const handleSearch = useCallback(() => {
    const params = {};

    if (searchText.trim()) {
      params.search = searchText.trim();
    }
    if (filters.priority) {
      params.priority = filters.priority;
    }
    if (filters.status) {
      params.status = filters.status;
    }

    // If no filters, fetch all tasks
    if (Object.keys(params).length === 0) {
      dispatch(fetchTasks());
    } else {
      dispatch(searchTasks(params));
    }
  }, [searchText, filters, dispatch]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const clearFilters = () => {
    setFilters({
      priority: "",
      status: "",
    });
  };

  const clearAll = () => {
    clearSearch();
    clearFilters();
  };

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
