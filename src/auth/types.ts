import type { ReactNode } from 'react';

export interface Auth {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
  useAuthState?: (storage?: Storage) => Auth;
}
