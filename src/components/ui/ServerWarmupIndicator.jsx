import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ServerWarmupIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wakeServer = async () => {
      if (sessionStorage.getItem("serverAwake")) {
        return;
      }

      // Show indicator immediately
      setVisible(true);

      try {
        await axios.get(`${API_BASE_URL}/api/health`, {
          timeout: 60000,
          withCredentials: true,
        });
      } catch (error) {
        console.warn("Warming up backend...");
      } finally {
        sessionStorage.setItem("serverAwake", "true");
        setVisible(false);
      }
    };

    wakeServer();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-200 border-t-blue-600" />
        <span className="text-sm font-medium text-blue-600">
          Starting server… this may take a minute
        </span>
      </div>
    </div>
  );
}

export default ServerWarmupIndicator;
