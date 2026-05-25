import { AuthContext } from '@/auth/auth-state/AuthContext.tsx';
import type { Auth } from '@/auth/auth-state/authContext.types.ts';
import { useContext } from 'react';

export function useAuth(): Auth {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');

  return context;
}
