import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Check if we've already warmed up the server in this session
      if (sessionStorage.getItem("appInitialized")) {
        setIsLoading(false);
        return;
      }

      try {
        // Ping the health endpoint to wake up the server
        await axios.get(`${API_BASE_URL}/api/health`, {
          timeout: 60000,
          withCredentials: true,
        });
      } catch (error) {
        console.warn("Server warmup in progress...");
      } finally {
        // Mark as initialized
        sessionStorage.setItem("appInitialized", "true");

        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#ffffff",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return children;
};

export default AppLoader;
