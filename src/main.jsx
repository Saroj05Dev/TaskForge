import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastProvider } from "@/contexts/ToastContext";
import AppBootstrap from "@/app/AppBootstrap";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <AppBootstrap>
          <App />
        </AppBootstrap>
      </ToastProvider>
    </Provider>
  </StrictMode>
);
