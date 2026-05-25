import type { LoginCredentials, LoginDependencies, LoginResult } from '@/auth/login/login.types.ts';

export const createLogin =
  (dependencies: LoginDependencies) =>
  async (credentials: LoginCredentials): Promise<LoginResult> => {
    const result = await dependencies.loginRequest(credentials);

    if (result.type === 'success') {
      dependencies.saveSession({ user: result.user, token: result.token });
    }

    return result;
  };
