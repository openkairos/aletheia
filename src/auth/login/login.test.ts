import { createLogin } from '@/auth/login/login.ts';
import type { LoginCredentials, LoginResult } from '@/auth/login/login.types.ts';
import type { AccessToken, AuthenticatedUser } from '@/auth/session/session.types.ts';

const credentials: LoginCredentials = {
  email: 'admin@example.com',
  password: 'secret',
};

const user: AuthenticatedUser = {
  id: '6a12eb9ab0b954cf6a367f92',
  username: 'admin',
  email: 'admin@example.com',
  roles: ['ROLE_SUPER_ADMIN'],
};

const token: AccessToken = {
  tokenType: 'Bearer',
  expiresIn: 3600,
  accessToken: 'access-token',
};

function createDependencies(result: LoginResult) {
  return {
    loginRequest: vi.fn().mockResolvedValue(result),
    saveSession: vi.fn(),
  };
}

describe('login', () => {
  it('should return the result from loginRequest', async () => {
    const result: LoginResult = { type: 'success', user, token };
    const dependencies = createDependencies(result);

    await expect(createLogin(dependencies)(credentials)).resolves.toBe(result);
  });

  it('should pass credentials to loginRequest', async () => {
    const dependencies = createDependencies({ type: 'success', user, token });

    await createLogin(dependencies)(credentials);

    expect(dependencies.loginRequest).toHaveBeenCalledWith(credentials);
  });

  it('should save session when login succeeds', async () => {
    const dependencies = createDependencies({ type: 'success', user, token });

    await createLogin(dependencies)(credentials);

    expect(dependencies.saveSession).toHaveBeenCalledWith({ user, token });
  });

  it.each<LoginResult>([
    { type: 'validation-error', errors: { password: ['This value should not be blank.'] } },
    { type: 'authentication-error', code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' },
    { type: 'network-error', message: 'Network error' },
    { type: 'unexpected-error', message: 'Unexpected error' },
  ])('should not save session when login returns $type', async result => {
    const dependencies = createDependencies(result);

    await createLogin(dependencies)(credentials);

    expect(dependencies.saveSession).not.toHaveBeenCalled();
  });
});
