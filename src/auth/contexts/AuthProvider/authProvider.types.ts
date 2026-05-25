import type { Auth } from '@/auth/contexts/AuthContext/authContext.types.ts';
import type { SessionStore } from '@/auth/session/sessionStore.types.ts';
import type { ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
  useAuthState?: (sessionStore?: SessionStore) => Auth;
}
