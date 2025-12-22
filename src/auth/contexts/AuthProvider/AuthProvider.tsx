import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import { useAuthState as _useAuthState } from '@/auth/contexts/AuthProvider/useAuthState.tsx';
import type { AuthProviderProps } from '@/auth/types.ts';

export function AuthProvider({ children, useAuthState = _useAuthState }: AuthProviderProps) {
  return <AuthContext.Provider value={useAuthState()}>{children}</AuthContext.Provider>;
}
