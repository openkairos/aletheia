import type { Auth } from '@/auth/types.ts';
import { useState } from 'react';

export function useAuthState(storage: Storage = localStorage): Auth {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.getItem('isAuthenticated') === 'true';
  });

  function login() {
    setIsAuthenticated(true);
    storage.setItem('isAuthenticated', 'true');
  }

  function logout() {
    setIsAuthenticated(false);
    storage.removeItem('isAuthenticated');
  }

  return { isAuthenticated, login, logout };
}
