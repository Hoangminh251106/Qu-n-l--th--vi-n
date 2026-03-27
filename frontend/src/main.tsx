import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { clearAuthToken, setAuthToken } from "./api/client";

function AuthTokenBridge() {
  const { token } = useAuth();
  useEffect(() => {
    if (token) setAuthToken(token);
    else clearAuthToken();
  }, [token]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AuthTokenBridge />
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

