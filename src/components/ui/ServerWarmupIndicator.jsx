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

      let timeoutId;

      timeoutId = setTimeout(() => setVisible(true), 1500);

      try {
        await axios.get(`${API_BASE_URL}/api/health`, {
          timeout: 60000,
          withCredentials: true,
        });
      } catch (error) {
        console.warn("Warming up backend...");
      } finally {
        sessionStorage.setItem("serverAwake", "true");

        clearTimeout(timeoutId);
        setVisible(false);
      }
    };

    wakeServer();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md border text-sm text-gray-600 z-50">
      <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      <span>Starting server… this may take a minute</span>
    </div>
  );
}

export default ServerWarmupIndicator;
