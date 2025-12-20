import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import { useAuthState } from '@/auth/contexts/AuthProvider/useAuthState.tsx';
import type { AuthProviderProps } from '@/auth/types.ts';

export function AuthProvider({ children, useAuthStateHook = useAuthState }: AuthProviderProps) {
  return <AuthContext.Provider value={useAuthStateHook()}>{children}</AuthContext.Provider>;
}
