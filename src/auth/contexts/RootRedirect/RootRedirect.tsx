import { type AuthContext, useAuth as _useAuth } from '@/auth';
import { Navigate as RNavigate } from 'react-router';

interface RootRedirectProps {
  useAuth?: AuthContext;
  Navigate?: typeof RNavigate;
}

export function RootRedirect({ useAuth = _useAuth, Navigate = RNavigate }: RootRedirectProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null;

  return <Navigate to='/auth/login' replace />;
}
