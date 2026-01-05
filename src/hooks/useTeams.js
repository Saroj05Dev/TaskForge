import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTeams, setCurrentTeam } from "@/features/teams/teamsSlice";

export const useTeams = () => {
  const dispatch = useDispatch();
  const {
    items: teams,
    currentTeam,
    loading,
    error,
  } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchAllTeams());
  }, [dispatch]);

  const selectTeam = (team) => {
    dispatch(setCurrentTeam(team));
  };

  return {
    teams,
    currentTeam,
    loading,
    error,
    selectTeam,
  };
};
