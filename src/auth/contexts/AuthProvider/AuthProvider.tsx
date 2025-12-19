import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import { useAuthState as defUseAuthState } from '@/auth/contexts/AuthProvider/useAuthState.tsx';
import type { AuthProviderProps } from '@/auth/types.ts';

export function AuthProvider({ children, useAuthState = defUseAuthState }: AuthProviderProps) {
  return <AuthContext.Provider value={useAuthState()}>{children}</AuthContext.Provider>;
}
