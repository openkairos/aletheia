import type { Auth } from '@/auth/types.ts';
import { useCallback, useState } from 'react';

export function useAuthState(storage: Storage = localStorage): Auth {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.getItem('isAuthenticated') === 'true';
  });

  const login = useCallback(() => {
    setIsAuthenticated(true);
    storage.setItem('isAuthenticated', 'true');
  }, [storage]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    storage.removeItem('isAuthenticated');
  }, [storage]);

  return { isAuthenticated, login, logout };
}
