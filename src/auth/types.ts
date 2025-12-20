import type { ReactNode } from 'react';

export interface Auth {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export type AuthContext = () => Auth;

export interface AuthProviderProps {
  children: ReactNode;
  useAuthState?: (storage?: Storage) => Auth;
}
