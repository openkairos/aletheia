import { AuthContext } from '@/auth/auth-state/AuthContext.tsx';
import type { AuthProviderProps } from '@/auth/auth-state/authProvider.types.ts';
import { useAuthState as _useAuthState } from '@/auth/auth-state/useAuthState.tsx';

export function AuthProvider({ children, useAuthState = _useAuthState }: AuthProviderProps) {
  return <AuthContext.Provider value={useAuthState()}>{children}</AuthContext.Provider>;
}
