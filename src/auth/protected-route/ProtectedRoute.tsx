import type { UseAuth } from '@/auth/auth-state/authContext.types.ts';
import { useAuth as _useAuth } from '@/auth/auth-state/useAuth.ts';
import type { ReactNode } from 'react';
import { Navigate as RNavigate } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
  Navigate?: typeof RNavigate;
  useAuth?: UseAuth;
}

export function ProtectedRoute({ children, Navigate = RNavigate, useAuth = _useAuth }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to='/auth/login' replace />;

  return <>{children}</>;
}
