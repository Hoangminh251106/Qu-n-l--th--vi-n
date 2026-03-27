import { createContext, useContext, useMemo, useState } from "react";
import type { JwtPayload, Role } from "../types";
import { decodeJwtPayload } from "./token";

type AuthState = {
  token: string | null;
  payload: JwtPayload | null;
};

type AuthContextValue = AuthState & {
  isAuthed: boolean;
  role: Role | null;
  login: (token: string) => void;
  logout: () => void;
};

const STORAGE_KEY = "library_token";

function readInitial(): AuthState {
  const token = localStorage.getItem(STORAGE_KEY);
  if (!token) return { token: null, payload: null };
  const payload = decodeJwtPayload(token);
  if (!payload) return { token: null, payload: null };
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp <= now) return { token: null, payload: null };
  return { token, payload };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readInitial());

  const value = useMemo<AuthContextValue>(() => {
    return {
      token: state.token,
      payload: state.payload,
      isAuthed: Boolean(state.token && state.payload),
      role: state.payload?.role ?? null,
      login: (token: string) => {
        const payload = decodeJwtPayload(token);
        if (!payload) return;
        localStorage.setItem(STORAGE_KEY, token);
        setState({ token, payload });
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setState({ token: null, payload: null });
      },
    };
  }, [state.payload, state.token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

