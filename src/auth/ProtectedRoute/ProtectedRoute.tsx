import { type AuthContext, useAuth as _useAuth } from '@/auth';
import type { ReactNode } from 'react';
import { Navigate as RNavigate } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
  Navigate?: typeof RNavigate;
  useAuth?: AuthContext;
}

export function ProtectedRoute({ children, Navigate = RNavigate, useAuth = _useAuth }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to='/auth/login' replace />;

  return <>{children}</>;
}
