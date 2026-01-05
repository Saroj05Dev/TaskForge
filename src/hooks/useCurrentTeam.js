import { useEffect, useState } from "react";
import axiosInstance from "@/helpers/axiosInstance";

/**
 * Fetches all teams of the currently logged-in user
 * Returns the first team as the current team for backward compatibility
 */
export const useCurrentTeam = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Use new /teams endpoint that returns array
        const res = await axiosInstance.get("/teams");
        const teams = res.data.data;
        // Set first team as current for backward compatibility
        setTeam(teams && teams.length > 0 ? teams[0] : null);
      } catch (error) {
        console.error("Failed to fetch current team", error);
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return { team, loading };
};
