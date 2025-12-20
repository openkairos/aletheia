import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import type { Auth } from '@/auth/types.ts';
import { useContext } from 'react';

export function useAuth(): Auth {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');

  return context;
}
