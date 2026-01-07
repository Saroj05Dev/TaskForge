import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AppBootstrap({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wakeServer = async () => {
      try {
        // Ping backend to wake up Render cold start
        await axios.get(`${API_BASE_URL}/api/health`, {
          timeout: 60000, // allow enough time for cold start
          withCredentials: true,
        });
      } catch (error) {
        console.warn("Backend is waking up...");
      } finally {
        setLoading(false);
      }
    };

    wakeServer();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        <p className="text-gray-600 text-sm text-center">
          Please wait for a minute while the server starts up...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default AppBootstrap;
