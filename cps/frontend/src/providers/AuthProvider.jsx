import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "cps-auth";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { user: null, token: null };
  try {
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
    };
  } catch (error) {
    console.warn("Failed to parse auth storage", error);
    localStorage.removeItem(STORAGE_KEY);
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredAuth();
    setUser(stored.user);
    setToken(stored.token);
    setReady(true);
  }, []);

  const persist = (nextState) => {
    if (!nextState.token) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: nextState.token, user: nextState.user })
    );
  };

  const login = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    persist(payload);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    persist({ user: null, token: null });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [token, user]
  );

  if (!ready) {
    return (
      <div className="app-shell">
        <div
          className="app-container"
          style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
        >
          <div
            className="card"
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div className="loader" />
            <span>Preparing CPS Academy…</span>
          </div>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within <AuthProvider>");
  }
  return context;
};

export { STORAGE_KEY as AUTH_STORAGE_KEY };
