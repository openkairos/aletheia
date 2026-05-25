import type { AccessToken, AuthenticatedUser, Session } from '@/auth/session/session.types.ts';

export interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginResult =
  | { type: 'success'; user: AuthenticatedUser; token: AccessToken }
  | { type: 'validation-error'; errors: Partial<Record<keyof LoginCredentials, string[]>> }
  | { type: 'authentication-error'; code: 'INVALID_CREDENTIALS'; message: string }
  | { type: 'network-error'; message: string }
  | { type: 'unexpected-error'; message: string };

export interface LoginDependencies {
  loginRequest: (credentials: LoginCredentials) => Promise<LoginResult>;
  saveSession: (session: Session) => void;
}
