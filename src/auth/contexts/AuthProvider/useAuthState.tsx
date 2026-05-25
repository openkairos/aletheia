import { createLocalStorageSessionStore } from '@/auth/session/localStorageSessionStore.ts';
import type { SessionStore } from '@/auth/session/sessionStore.types.ts';
import type { Auth } from '@/auth/contexts/AuthContext/authContext.types.ts';
import { useCallback, useState } from 'react';

export function useAuthState(sessionStore: SessionStore = createLocalStorageSessionStore(localStorage)): Auth {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStore.read() !== null;
  });

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStore.clear();
  }, [sessionStore]);

  return { isAuthenticated, login, logout };
}
