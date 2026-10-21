"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

interface Session {
  kind: "user" | "guest";
  name?: string;
  email?: string;
}

interface AuthContextValue {
  session: Session | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => string | null;
  register: (user: StoredUser) => string | null;
  continueAsGuest: () => void;
  logout: () => void;
}

const USERS_KEY = "mareln_users_v1";
const SESSION_KEY = "mareln_session_v1";
const SESSION_EVENT = "mareln-session-changed";
const AuthContext = createContext<AuthContextValue | null>(null);

function subscribeToSession(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SESSION_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SESSION_EVENT, callback);
  };
}

function getSessionSnapshot() {
  return localStorage.getItem(SESSION_KEY);
}

function subscribeToHydration() {
  return () => undefined;
}

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const savedSession = useSyncExternalStore(subscribeToSession, getSessionSnapshot, () => null);
  const isReady = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const session = useMemo(() => {
    try {
      return savedSession ? (JSON.parse(savedSession) as Session) : null;
    } catch {
      return null;
    }
  }, [savedSession]);

  const saveSession = (nextSession: Session | null) => {
    if (nextSession) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    window.dispatchEvent(new Event(SESSION_EVENT));
  };

  const login = (email: string, password: string) => {
    const user = readUsers().find(
      (item) => item.email === email.toLowerCase() && item.password === password,
    );

    if (!user) return "E-mail ou senha incorretos.";

    saveSession({ kind: "user", name: user.name, email: user.email });
    return null;
  };

  const register = (user: StoredUser) => {
    const users = readUsers();
    const normalizedEmail = user.email.toLowerCase();

    if (users.some((item) => item.email === normalizedEmail)) {
      return "Já existe uma conta com este e-mail.";
    }

    const newUser = { ...user, email: normalizedEmail };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    saveSession({ kind: "user", name: newUser.name, email: newUser.email });
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isReady,
        isAuthenticated: session?.kind === "user",
        login,
        register,
        continueAsGuest: () => saveSession({ kind: "guest" }),
        logout: () => saveSession(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
