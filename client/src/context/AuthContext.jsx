import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { loginStudent, registerStudent } from '../services/api';
import { clearUser, getStoredUser, storeUser } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = useCallback(async (email, password) => {
    const loggedIn = await loginStudent(email, password);
    storeUser(loggedIn);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const register = useCallback((data) => registerStudent(data), []);

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);