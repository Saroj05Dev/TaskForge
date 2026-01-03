import { useEffect, useState } from "react";
import axiosInstance from "@/helpers/axiosInstance";

/**
 * Fetches the team of the currently logged-in user
 */
export const useCurrentTeam = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axiosInstance.get("/teams/my");
        setTeam(res.data.data);
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
