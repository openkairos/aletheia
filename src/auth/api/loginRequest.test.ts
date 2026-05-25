import { createLoginRequest } from '@/auth/api/loginRequest.ts';
import type { LoginCredentials } from '@/auth/login/login.types.ts';
import { API_BASE_PATH } from '@/config/api.ts';

const credentials: LoginCredentials = {
  email: 'admin@example.com',
  password: 'secret',
};

const successResponse = {
  data: {
    user: {
      id: '6a12eb9ab0b954cf6a367f92',
      username: 'admin',
      email: 'admin@example.com',
      roles: ['ROLE_SUPER_ADMIN'],
    },
    token: {
      token_type: 'Bearer',
      expires_in: 3600,
      access_token: 'access-token',
    },
  },
};

function createResponse(status: number, body: unknown) {
  return {
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

function createRejectedJsonResponse(status: number) {
  return {
    status,
    json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
  } as unknown as Response;
}

describe('loginRequest', () => {
  it('should send login credentials to the proxied login endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse(200, successResponse));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await loginRequest(credentials);

    expect(fetchMock).toHaveBeenCalledWith('/kairos/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  });

  it('should map successful login response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse(200, successResponse));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({
      type: 'success',
      user: {
        id: '6a12eb9ab0b954cf6a367f92',
        username: 'admin',
        email: 'admin@example.com',
        roles: ['ROLE_SUPER_ADMIN'],
      },
      token: {
        tokenType: 'Bearer',
        expiresIn: 3600,
        accessToken: 'access-token',
      },
    });
  });

  it('should map validation errors', async () => {
    const errors = { password: ['This value should not be blank.'] };
    const fetchMock = vi.fn().mockResolvedValue(createResponse(400, { errors }));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({ type: 'validation-error', errors });
  });

  it('should map authentication errors', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createResponse(401, {
        type: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials',
      }),
    );
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({
      type: 'authentication-error',
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid credentials',
    });
  });

  it('should map unexpected statuses', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse(500, {}));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({
      type: 'unexpected-error',
      message: 'Unexpected login response.',
    });
  });

  it('should map rejected fetch to network error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({
      type: 'network-error',
      message: 'Unable to reach the login service.',
    });
  });

  it('should map invalid json to unexpected error', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createRejectedJsonResponse(200));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({
      type: 'unexpected-error',
      message: 'Unexpected login response.',
    });
  });

  it('should map malformed success response to unexpected error', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse(200, { data: {} }));
    const loginRequest = createLoginRequest({ fetch: fetchMock, apiBasePath: API_BASE_PATH });

    await expect(loginRequest(credentials)).resolves.toEqual({
      type: 'unexpected-error',
      message: 'Unexpected login response.',
    });
  });
});
